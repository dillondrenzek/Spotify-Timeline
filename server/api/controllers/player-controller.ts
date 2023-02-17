import { ApiTypes } from 'api-types';
import express from 'express';
import { SpotifyWebApi } from '../../spotify/spotify-web-api';

const DEBUG_MODE = true;

function debug(...data: any[]) {
  if (DEBUG_MODE) {
    console.log(...data);
  }
}

/**
 * Player Controller
 */
export class PlayerController {
  constructor(private spotifyWebApi: SpotifyWebApi) {}

  /**
   * Get Player State
   */
  getPlayerState: express.RequestHandler = async (req, res, next) => {
    try {
      const playerState: ApiTypes.PlayerState =
        await this.spotifyWebApi.getPlayerState();

      res.status(200).json(playerState);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Start/Resume Playback
   */
  startPlayback: express.RequestHandler = async (req, res, next) => {
    try {
      const { body } = req;

      debug('- Body:', JSON.parse(JSON.stringify(body)));

      // TODO: Validate Body
      const { contextUri, uri, deviceId } =
        body as ApiTypes.StartPlaybackRequestBody;

      await this.spotifyWebApi.startPlayback(uri, contextUri, deviceId);

      res.status(200).json(body);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Pause Playback
   */
  pausePlayback: express.RequestHandler = async (req, res, next) => {
    try {
      // TODO: Type this properly
      const queryParams = req.query as any;
      const deviceId = queryParams.device_id;

      debug('- Query:', queryParams);

      await this.spotifyWebApi.pausePlayback(deviceId);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  /**
   * Get Devices
   */
  getDevices: express.RequestHandler = async (req, res, next) => {
    try {
      const devices = await this.spotifyWebApi.getUsersDevices();
      const response: ApiTypes.GetUsersDevicesResponse = devices.devices;

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  };
}
