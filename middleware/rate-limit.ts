import express from 'express';
import { DateTime } from 'luxon';

const DEBUG_MODE = false;

interface RateLimitMapValue {
  timestamp: string;
  count: number;
}

const limitedPaths: Record<string, RateLimitMapValue> = {};

export function rateLimit(): express.RequestHandler {
  function getCacheValue(maxHits: number = 10) {
    return {
      timestamp: DateTime.now().toISO(),
      count: maxHits,
    };
  }

  function setNewCacheValue(cacheKey: string) {
    limitedPaths[cacheKey] = getCacheValue();
  }

  return (req, res, next) => {
    const cacheKey = req.path;
    const currentCacheValue = limitedPaths[cacheKey];

    if (DEBUG_MODE) {
      console.log('Rate Limit entry:', JSON.stringify(currentCacheValue));
    }

    // No cache hit
    if (!currentCacheValue) {
      setNewCacheValue(cacheKey);
      next();
      return;
    }

    const cachedDate = DateTime.fromISO(currentCacheValue.timestamp);
    const endCachePeriod = cachedDate.plus({ minute: 1 });

    if (DEBUG_MODE) {
      console.log(endCachePeriod.diffNow().milliseconds);
    }

    // If after the cache period
    if (endCachePeriod.diffNow().milliseconds < 0) {
      setNewCacheValue(cacheKey);
      next();
      return;
    } else {
      // Within cache period
      if (currentCacheValue.count > 0) {
        // Count still remaining
        currentCacheValue.count--;
        next();
        return;
      } else {
        // No count remaining
        errorResponse(429, { code: 'RATE_LIMITED' })(res);
        return;
      }
    }
  };
}

function errorResponse(statusCode: number, json: any) {
  return (res: express.Response) => {
    res.status(statusCode).json(json);
  };
}
