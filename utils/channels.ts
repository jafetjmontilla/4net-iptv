import { _ } from "@vidstack/react/dist/types/vidstack-react.js"

export interface Channel {
  numberChannel: number
  title: string
  logo: string
  src: string
  showMenu?: boolean
}


export const channelsList: Channel[] = [
  // {
  //   numberChannel: 100,
  //   title: "intro",
  //   logo: "/channels/antv.webp",
  //   showMenu: true,
  //   src: "/channels/intro.mp4"
  // },

  {
    numberChannel: 101,
    title: "canal 11",
    logo: "/channels/canal11.webp",
    src: "https://airtek.tv/livestream/CANAL_11.m3u8"//contactar
  },
    {
    numberChannel: 102,
    title: "antv",
    logo: "/channels/antv.webp",
    src: "https://airtek.tv/livestream/ANTV.m3u8"
  },
  {
    numberChannel: 103,
    title: "canal i",
    logo: "/channels/canali.webp",
    src: "https://airtek.tv/livestream/CANAL_I.m3u8"//contactar
  },
  {
    numberChannel: 104,
    title: "colombeia",
    logo: "/channels/colombeia.webp",
    //src:"https://live-c.cf.dmcdn.net/sec2(YLDQhjis-kgtEwIkXiJ3-Yaxxu3tfRY64joFXXBL0RyYI6toVX6dDbUxUyMGZA1sOn5V6Z4CiuB_syE-6ot4_oPzHDKOLkW6PnP52QJMjFg)/dm/3/x8sp8x8/s/live-2.m3u8"
    src: "https://airtek.tv/livestream/COLOMBEIA.m3u8"
  },
  {
    numberChannel: 105,
    title: "conciencia tv",
    logo: "/channels/conciencia_tv.webp",
    src: "https://airtek.tv/livestream/CONCIENCIA_TV.m3u8"
  },
  {
    numberChannel: 106,
    title: "globovision",
    logo: "/channels/globovision.webp",
    src: "https://airtek.tv/livestream/Globovision.m3u8"
  },
  {
    numberChannel: 107,
    title: "telesur",
    logo: "/channels/telesur.webp",
        showMenu: true,
src: "https://cdnesmain.telesur.ultrabase.net/mbliveMain/hd/chunklist.m3u8"
    //src: "https://airtek.tv/livestream/TELESUR.m3u8"
  },
  {
    numberChannel: 108,
    title: "televen",
    logo: "/channels/televen.webp",
    showMenu: true,
    // src: "https://mediablocks-sec.global.ssl.fastly.net/10255/live/hls/televen/index.m3u8?hdnts=data%3Dip%3D255.223.177.14%2Cid%3DTLV-GUEST%2Cpid%3D255%2Cdid%3DN%2FA%2Csid%3DWBS~acl%3D%2F10255%2Flive%2Fhls%2Fteleven%2F%2A~exp%3D1712686763~hmac%3D5849004cd3d0f8acfab4f39a6e6e088cbc2ef6b6efdc894f45a51ca6601b1a63&AV_AID=STPLX_AID&AV_IDFAMD5=STPLX_IDFAMD5&AV_CATEGORY=IAB1-7&AVC_TIME=STPLX_TM&AV_UPAL=STPLX_UPAL&AV_CCPA=1YYY&AV_TITLE=Televen+HD&AV_APPSTOREURL=STPLX_ASTRURL&AV_SECURED=1&AV_APPPKGNAME=STPLX_APKGN&AV_CHANNEL_NAME=Televen+HD&AV_DNT=0&AVC_INVIEWPERC=100&AV_URL=https%3A%2F%2FSTPLX_DOMAIN%2Fplayer%2Ftv%3FchannelId%3D20000841%26categoryId%3D0%26channelNumber%3D1&AV_VIDEOID=20000841&AV_APPVERS=STPLX_AVER&AV_CONTENT_TYPE=LIVE&AV_AIDMD5=STPLX_AIDMD5&AV_AIDSHA1=STPLX_AIDSHA1&AV_IDFASHA1=STPLX_IDFASHA1&AV_MAKE=STPLX_MK&AVC_DATE=STPLX_DT&AV_IDFA=STPLX_IDFA&AV_APPNAME=STPLX_ANM&AV_DTRACK=1&AV_VIDEOURL=https%3A%2F%2FSTPLX_DOMAIN%2Fplayer%2Ftv%3FchannelId%3D20000841%26categoryId%3D0%26channelNumber%3D1&AV_SITE_CATEGORY=IAB1-7&AV_LANGUAGE=Sp&AV_MODEL=STPLX_MDL&AVC_INVIEW=1"
    src: "https://airtek.tv/livestream/TELEVEN.m3u8"
  },
  {
    numberChannel: 109,
    title: "tlt",
    logo: "/channels/tlt.webp",
    src: "https://airtek.tv/livestream/TLT.m3u8"
  },
  {
    numberChannel: 110,
    title: "tves",
    logo: "/channels/tves.webp",
    //src:"https://edge1o.live.opencaster.com/caster/erCkqDzdGzpj.m3u8"
    src: "https://airtek.tv/livestream/TVES.m3u8"
  },
  {
    numberChannel: 111,
    title: "tvfanb",
    logo: "/channels/tvfanb.webp",
    src: "https://airtek.tv/livestream/TV_FANB.m3u8"//contactar
  },
  {
    numberChannel: 112, 
    title: "venevision",
    logo: "/channels/venevision.webp",
    showMenu: true,
    src:"https://venevision.akamaized.net/hls/live/2098814/VENEVISION/master.m3u8"
    //src: "https://airtek.tv/livestream/Venevision.m3u8"
  },
  {
    numberChannel: 113,
    title: "vive",
    logo: "/channels/vivetv.webp",
    src: "https://airtek.tv/livestream/VIVE_TV.m3u8"
  },
  {
    numberChannel: 114,
    title: "vtv",
    logo: "/channels/vtv.webp",
    //src:"https://live-c.cf.dmcdn.net/sec2(O4w2DM2P2OwimOVf7nWQOcEHPyY8K0KoiCzF_a5oRpYfbdyonce9ZHI96ay1nU29026lmMylZabf04HaB5YmvK1eL4Fuh2yHiyQJ68sDM8E)/dm/3/x8rtkvs/s/live-1.m3u8"
    src: "https://airtek.tv/livestream/VTV.m3u8"
  },
]
