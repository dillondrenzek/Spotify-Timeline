declare namespace SpotifyApi {
  interface Artist {
    // external_urls: { spotify: "https://open.spotify.com/artist/4pb4rqWSoGUgxm63xmJ8xc" }
    // href: "https://api.spotify.com/v1/artists/4pb4rqWSoGUgxm63xmJ8xc"
    // id: "4pb4rqWSoGUgxm63xmJ8xc"
    // name: "Madeon"
    name: string;
    // type: "artist"
    // uri: "spotify:artist:4pb4rqWSoGUgxm63xmJ8xc"
  }

  interface Track {
    // added_at: "2020-07-20T23:19:07Z"
    // track: { album: { album_type: "single", … }, … }
    // album: { album_type: "single", … }
    // artists: [{ external_urls: { spotify: "https://open.spotify.com/artist/4pb4rqWSoGUgxm63xmJ8xc" }, … }]
    artists: Artist[];
    // available_markets: ["AD", "AE", "AL", "AR", "AT", "AU", "BA", "BE", "BG", "BH", "BO", "BR", "BY", "CA", "CH", "CL", "CO", …]
    // disc_number: 1
    // duration_ms: 234933
    // explicit: false
    // external_ids: { isrc: "USQX91901212" }
    // external_urls: { spotify: "https://open.spotify.com/track/1oUbYmF4SYYHorKY1wKo0K" }
    // href: "https://api.spotify.com/v1/tracks/1oUbYmF4SYYHorKY1wKo0K"
    // id: "1oUbYmF4SYYHorKY1wKo0K"
    // is_local: false
    // name: "Dream Dream Dream"
    name: string;
    // popularity: 48
    // preview_url: "https://p.scdn.co/mp3-preview/17f06d6b5e363d08478234a6913c03fc34d4e2b7?cid=19fe4b9ac3ad450fa1ef5a7f5934f0be"
    // track_number: 1
    // type: "track"
    // uri: "spotify:track:1oUbYmF4SYYHorKY1wKo0K"
  }

  interface SavedSongs {
    added_at: string; // Date
    track: Track;
  }

  interface CurrentUserSavedSongs {
    // href: "https://api.spotify.com/v1/me/tracks?offset=0&limit=20"
    href: string;
    // items: [{ added_at: "2020-07-20T23:19:07Z", track: { album: { album_type: "single", … }, … } }, …]
    items: SavedSongs[];
    // limit: 20
    limit: number;
    // next: "https://api.spotify.com/v1/me/tracks?offset=20&limit=20"
    next: string;
    // offset: 0
    offset: string;
    // previous: null
    previous: null;
    // total: 743
    total: number;
  }

  interface CurrentUserProfile {
    country: string;
    display_name: string;
    email: string;
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    images: {
      height: null; // number?
      url: string;
      width: null; // number?
    }[];
    product: 'premium';
    type: 'user';
    uri: string;

    // "country": "SE",
    // "display_name": "JM Wizzler",
    // "email": "email@example.com",
    // "external_urls": { "spotify": "https://open.spotify.com/user/wizzler" },
    // "followers": { "href": null, "total": 3829 },
    // "href": "https://api.spotify.com/v1/users/wizzler",
    // "id": "wizzler",
    // "images": [
    //   { "height": null, "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg", "width": null }
    // ],
    // "product": "premium",
    // "type": "user",
    // "uri": "spotify:user:wizzler"
  }
}