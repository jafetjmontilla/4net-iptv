import { _ } from "@vidstack/react/dist/types/vidstack-react.js"


export interface Channel {
  numberChannel: number
  title: string
  logo: string
  src: string
  showMenu?: boolean
  id: string
  country: string
  description?: string
}


export const channelsList: Channel[] = [
  {
    title: 'AguacateTV',
    id: 'AguacateTV.ve',
    country: 've',
    logo: 'https://i.ibb.co/wpWBsgf/IMG-20230705-154622.jpg',
    description: 'Entertainment',
    src: 'https://test.4net.com.ve/hls/101.m3u8',
    numberChannel: 101
  },
  {
    title: 'AnzoateguiTV',
    id: 'AnzoateguiTV.ve',
    country: 've',
    logo: 'https://i.imgur.com/SLqrEOz.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/102.m3u8',
    numberChannel: 102
  },
  {
    title: 'CanalI',
    id: 'CanalI.ve',
    country: 've',
    logo: 'https://i.imgur.com/vKfOavW.png',
    description: 'News',
    src: 'https://test.4net.com.ve/hls/109.m3u8',
    numberChannel: 109
  },
  {
    title: 'Canal21Tachira',
    id: 'Canal21Tachira.ve',
    country: 've',
    logo: 'https://i.imgur.com/7Tb7CF4.jpg',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/106.m3u8',
    numberChannel: 106
  },
  {
    title: 'AudazTV',
    id: 'AudazTV.ve',
    country: 've',
    logo: 'https://i.imgur.com/QtCgtZq.jpg',
    description: 'Religious',
    src: 'https://test.4net.com.ve/hls/103.m3u8',
    numberChannel: 103
  },
  {
    title: 'CanalCulturaVenezuela',
    id: 'CanalCulturaVenezuela.ve',
    country: 've',
    logo: 'https://culturavenezuela.com/wp-content/uploads/2021/07/cropped-Cierre-Alfa-SE.00_00_04_25.Imagen-fija003-150x150.png',
    description: 'Culture;Music',
    src: 'https://test.4net.com.ve/hls/107.m3u8',
    numberChannel: 107
  },
  {
    title: 'CatatumboTV',
    id: 'CatatumboTV.ve',
    country: 've',
    logo: 'https://i.imgur.com/LBI2la0.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/112.m3u8',
    numberChannel: 112
  },
  {
    title: 'ChivacoaTVInternacional',
    id: 'ChivacoaTVInternacional.ve',
    country: 've',
    logo: 'https://i.imgur.com/9rbwZFY.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/113.m3u8',
    numberChannel: 113
  },
  {
    title: 'eSportsMaxTV',
    id: 'eSportsMaxTV.ve',
    country: 've',
    logo: 'https://i.imgur.com/OprRgQN.png',
    description: 'Animation',
    src: 'https://test.4net.com.ve/hls/116.m3u8',
    numberChannel: 116
  },
  {
    title: 'EXCTV',
    id: 'EXCTV.ve',
    country: 've',
    logo: 'https://i.imgur.com/Znd1Ml9.png',
    description: 'Science',
    src: 'https://test.4net.com.ve/hls/117.m3u8',
    numberChannel: 117
  },
  {
    title: 'FeTelevision',
    id: 'FeTelevision.ve',
    country: 've',
    logo: 'https://i.imgur.com/hLorJRD.jpg',
    description: 'Religious',
    src: 'https://test.4net.com.ve/hls/118.m3u8',
    numberChannel: 118
  },
  {
    title: 'Globovision',
    id: 'Globovision.ve',
    country: 've',
    logo: 'https://i.imgur.com/v6nRdxQ.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/120.m3u8',
    numberChannel: 120
  },
  {
    title: 'GlowTV',
    id: 'GlowTV.ve',
    country: 've',
    logo: 'https://i.ibb.co/fN0Tsr2/glowtv2.png',
    src: 'https://test.4net.com.ve/hls/121.m3u8',
    numberChannel: 121
  },
  {
    title: 'GuaroTV',
    id: 'GuaroTV.ve',
    country: 've',
    logo: 'https://i.ibb.co/LN92K6h/IMG-20230705-154347.jpg',
    description: 'Entertainment',
    src: 'https://test.4net.com.ve/hls/122.m3u8',
    numberChannel: 122
  },
  {
    title: 'InterTV',
    id: 'InterTV.ve',
    country: 've',
    logo: 'https://i.ibb.co/HG2DM8G/IMG-20230705-153952.jpg',
    src: 'https://test.4net.com.ve/hls/124.m3u8',
    numberChannel: 124
  },
  {
    title: 'Italianissimo',
    id: 'Italianissimo.ve',
    country: 've',
    logo: 'https://i.imgur.com/JCpbUZB.png',
    description: 'Music',
    src: 'https://test.4net.com.ve/hls/125.m3u8',
    numberChannel: 125
  },
  {
    title: 'KandelaTV',
    id: 'KandelaTV.ve',
    country: 've',
    logo: 'https://i.imgur.com/cCFxyIp.jpg',
    description: 'Music',
    src: 'https://test.4net.com.ve/hls/126.m3u8',
    numberChannel: 126
  },
  {
    title: 'LaIguanaTV',
    id: 'LaIguanaTV.ve',
    country: 've',
    logo: 'https://i.ibb.co/5r3hBNz/logo-footer.png',
    description: 'News',
    src: 'https://test.4net.com.ve/hls/127.m3u8',
    numberChannel: 127
  },
  {
    title: 'LatinaTV',
    id: 'LatinaTV.ve',
    country: 've',
    logo: 'https://i0.wp.com/latinamedios.com/wp-content/uploads/2023/03/LOGO-LATINA-TV-H-500.png?w',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/128.m3u8',
    numberChannel: 128
  },
  {
    title: 'MasTalk',
    id: 'MasTalk.ve',
    country: 've',
    logo: 'https://i.imgur.com/unE2LGz.jpg',
    description: 'Entertainment',
    src: 'https://test.4net.com.ve/hls/129.m3u8',
    numberChannel: 129
  },
  {
    title: 'MDATelevision',
    id: 'MDATelevision.ve',
    country: 've',
    logo: 'https://i.imgur.com/AlY38PN.png',
    description: 'Entertainment',
    src: 'https://test.4net.com.ve/hls/131.m3u8',
    numberChannel: 131
  },
  {
    title: 'MonagasVision',
    id: 'MonagasVision.ve',
    country: 've',
    logo: 'https://i.imgur.com/yfgTa2d.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/132.m3u8',
    numberChannel: 132
  },
  {
    title: 'OnzaTV',
    id: 'OnzaTV.ve',
    country: 've',
    logo: 'https://i.imgur.com/usrP6T2.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/133.m3u8',
    numberChannel: 133
  },
  {
    title: 'OxigenoTV',
    id: 'OxigenoTV.ve',
    country: 've',
    logo: 'https://i.imgur.com/n3PweBQ.png',
    description: 'Music',
    src: 'https://test.4net.com.ve/hls/134.m3u8',
    numberChannel: 134
  },
  {
    title: 'Panavision',
    id: 'Panavision.ve',
    country: 've',
    logo: 'https://i.imgur.com/qj1qBn1.png',
    description: 'Music',
    src: 'https://test.4net.com.ve/hls/135.m3u8',
    numberChannel: 135
  },
  {
    title: 'PromarTV',
    id: 'PromarTV.ve',
    country: 've',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Promar_Television.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/137.m3u8',
    numberChannel: 137
  },
  {
    title: 'ReformaTV',
    id: 'ReformaTV.ve',
    country: 've',
    logo: 'https://i.imgur.com/iZMDddR.png',
    description: 'Religious',
    src: 'https://test.4net.com.ve/hls/139.m3u8',
    numberChannel: 139
  },
  {
    title: 'ShowVenTV',
    id: 'ShowVenTV.ve',
    country: 've',
    logo: 'https://i.imgur.com/AJIN8Dc.png',
    description: 'Culture;Music',
    src: 'https://test.4net.com.ve/hls/141.m3u8',
    numberChannel: 141
  },
  {
    title: 'SomosTV',
    id: 'SomosTV.ve',
    country: 've',
    logo: 'https://i.imgur.com/jOroeJZ.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/142.m3u8',
    numberChannel: 142
  },
  {
    title: 'TeleAragua',
    id: 'TeleAragua.ve',
    country: 've',
    logo: 'https://i.imgur.com/jPzcb2S.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/146.m3u8',
    numberChannel: 146
  },
  {
    title: 'Telecentro',
    id: 'Telecentro.ve',
    country: 've',
    logo: 'https://i.imgur.com/QtRNfaj.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/148.m3u8',
    numberChannel: 148
  },
  {
    title: 'Telesur',
    id: 'Telesur.ve',
    country: 've',
    logo: 'https://i.imgur.com/P50VjRX.png',
    description: 'News',
    src: 'https://test.4net.com.ve/hls/150.m3u8',
    numberChannel: 150
  },
  {
    title: 'TelevisoradeOriente',
    id: 'TelevisoradeOriente.ve',
    country: 've',
    logo: 'https://i.imgur.com/wFC6Xxq.png',
    description: 'Music',
    src: 'https://test.4net.com.ve/hls/152.m3u8',
    numberChannel: 152
  },
  {
    title: 'TNORadio',
    id: 'TNORadio.ve',
    country: 've',
    logo: 'https://i.ibb.co/0rYsbRk/Logo-TNO-2021-white.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/153.m3u8',
    numberChannel: 153
  },
  {
    title: 'TRV',
    id: 'TRV.ve',
    country: 've',
    logo: 'https://i.ibb.co/Yt6qyjL/trv.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/156.m3u8',
    numberChannel: 156
  },
  {
    title: 'TVFANB',
    id: 'TVFANB.ve',
    country: 've',
    logo: 'https://i.imgur.com/yaEyv29.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/159.m3u8',
    numberChannel: 159
  },
  {
    title: 'TVes',
    id: 'TVes.ve',
    country: 've',
    logo: 'https://i.imgur.com/QX5DVUB.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/160.m3u8',
    numberChannel: 160
  },
  {
    title: 'ValeTV',
    id: 'ValeTV.ve',
    country: 've',
    logo: 'https://i.imgur.com/NMI2Wed.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/163.m3u8',
    numberChannel: 163
  },
  {
    title: 'VePlus',
    id: 'VePlus.ve',
    country: 've',
    logo: 'https://i.imgur.com/uc3zqcP.png',
    src: 'https://test.4net.com.ve/hls/164.m3u8',
    numberChannel: 164
  },
  {
    title: 'Venevision',
    id: 'Venevision.ve',
    country: 've',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Logotipo_de_Venevisi%C3%B3n.svg/512px-Logotipo_de_Venevisi%C3%B3n.svg.png',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/165.m3u8',
    numberChannel: 165
  },
  {
    title: 'VenevisionInternacional',
    id: 'VenevisionInternacional.ve',
    country: 've',
    logo: 'https://i.imgur.com/vtGED07.jpg',
    description: 'General',
    src: 'https://test.4net.com.ve/hls/166.m3u8',
    numberChannel: 166
  },
  {
    title: 'VepacoTV',
    id: 'VepacoTV.ve',
    country: 've',
    logo: 'https://i.imgur.com/0bqJksL.png',
    description: 'Music',
    src: 'https://test.4net.com.ve/hls/168.m3u8',
    numberChannel: 168
  }
]

//   [
//   // {
//   //   numberChannel: 100,
//   //   title: "intro",
//   //   logo: "/channels/antv.webp",
//   //   showMenu: true,
//   //   src: "/channels/intro.mp4"
//   // },

//   {
//     numberChannel: 101,
//     title: "canal 11",
//     logo: "/channels/canal11.webp",
//     src: "https://airtek.tv/livestream/CANAL_11.m3u8"//contactar
//   },
//     {
//     numberChannel: 102,
//     title: "antv",
//     logo: "/channels/antv.webp",
//     src: "https://airtek.tv/livestream/ANTV.m3u8"
//   },
//   {
//     numberChannel: 103,
//     title: "canal i",
//     logo: "/channels/canali.webp",
//     src: "https://airtek.tv/livestream/CANAL_I.m3u8"//contactar
//   },
//   {
//     numberChannel: 104,
//     title: "colombeia",
//     logo: "/channels/colombeia.webp",
//     //src:"https://live-c.cf.dmcdn.net/sec2(YLDQhjis-kgtEwIkXiJ3-Yaxxu3tfRY64joFXXBL0RyYI6toVX6dDbUxUyMGZA1sOn5V6Z4CiuB_syE-6ot4_oPzHDKOLkW6PnP52QJMjFg)/dm/3/x8sp8x8/s/live-2.m3u8"
//     src: "https://airtek.tv/livestream/COLOMBEIA.m3u8"
//   },
//   {
//     numberChannel: 105,
//     title: "conciencia tv",
//     logo: "/channels/conciencia_tv.webp",
//     src: "https://airtek.tv/livestream/CONCIENCIA_TV.m3u8"
//   },
//   {
//     numberChannel: 106,
//     title: "globovision",
//     logo: "/channels/globovision.webp",
//     src: "https://airtek.tv/livestream/Globovision.m3u8"
//   },
//   {
//     numberChannel: 107,
//     title: "telesur",
//     logo: "/channels/telesur.webp",
//         showMenu: true,
// src: "https://cdnesmain.telesur.ultrabase.net/mbliveMain/hd/chunklist.m3u8"
//     //src: "https://airtek.tv/livestream/TELESUR.m3u8"
//   },
//   {
//     numberChannel: 108,
//     title: "televen",
//     logo: "/channels/televen.webp",
//     showMenu: true,
//     // src: "https://mediablocks-sec.global.ssl.fastly.net/10255/live/hls/televen/index.m3u8?hdnts=data%3Dip%3D255.223.177.14%2Cid%3DTLV-GUEST%2Cpid%3D255%2Cdid%3DN%2FA%2Csid%3DWBS~acl%3D%2F10255%2Flive%2Fhls%2Fteleven%2F%2A~exp%3D1712686763~hmac%3D5849004cd3d0f8acfab4f39a6e6e088cbc2ef6b6efdc894f45a51ca6601b1a63&AV_AID=STPLX_AID&AV_IDFAMD5=STPLX_IDFAMD5&AV_CATEGORY=IAB1-7&AVC_TIME=STPLX_TM&AV_UPAL=STPLX_UPAL&AV_CCPA=1YYY&AV_TITLE=Televen+HD&AV_APPSTOREURL=STPLX_ASTRURL&AV_SECURED=1&AV_APPPKGNAME=STPLX_APKGN&AV_CHANNEL_NAME=Televen+HD&AV_DNT=0&AVC_INVIEWPERC=100&AV_URL=https%3A%2F%2FSTPLX_DOMAIN%2Fplayer%2Ftv%3FchannelId%3D20000841%26categoryId%3D0%26channelNumber%3D1&AV_VIDEOID=20000841&AV_APPVERS=STPLX_AVER&AV_CONTENT_TYPE=LIVE&AV_AIDMD5=STPLX_AIDMD5&AV_AIDSHA1=STPLX_AIDSHA1&AV_IDFASHA1=STPLX_IDFASHA1&AV_MAKE=STPLX_MK&AVC_DATE=STPLX_DT&AV_IDFA=STPLX_IDFA&AV_APPNAME=STPLX_ANM&AV_DTRACK=1&AV_VIDEOURL=https%3A%2F%2FSTPLX_DOMAIN%2Fplayer%2Ftv%3FchannelId%3D20000841%26categoryId%3D0%26channelNumber%3D1&AV_SITE_CATEGORY=IAB1-7&AV_LANGUAGE=Sp&AV_MODEL=STPLX_MDL&AVC_INVIEW=1"
//     src: "https://airtek.tv/livestream/TELEVEN.m3u8"
//   },
//   {
//     numberChannel: 109,
//     title: "tlt",
//     logo: "/channels/tlt.webp",
//     src: "https://airtek.tv/livestream/TLT.m3u8"
//   },
//   {
//     numberChannel: 110,
//     title: "tves",
//     logo: "/channels/tves.webp",
//     //src:"https://edge1o.live.opencaster.com/caster/erCkqDzdGzpj.m3u8"
//     src: "https://airtek.tv/livestream/TVES.m3u8"
//   },
//   {
//     numberChannel: 111,
//     title: "tvfanb",
//     logo: "/channels/tvfanb.webp",
//     src: "https://airtek.tv/livestream/TV_FANB.m3u8"//contactar
//   },
//   {
//     numberChannel: 112, 
//     title: "venevision",
//     logo: "/channels/venevision.webp",
//     showMenu: true,
//     src:"https://venevision.akamaized.net/hls/live/2098814/VENEVISION/master.m3u8"
//     //src: "https://airtek.tv/livestream/Venevision.m3u8"
//   },
//   {
//     numberChannel: 113,
//     title: "vive",
//     logo: "/channels/vivetv.webp",
//     src: "https://airtek.tv/livestream/VIVE_TV.m3u8"
//   },
//   {
//     numberChannel: 114,
//     title: "vtv",
//     logo: "/channels/vtv.webp",
//     //src:"https://live-c.cf.dmcdn.net/sec2(O4w2DM2P2OwimOVf7nWQOcEHPyY8K0KoiCzF_a5oRpYfbdyonce9ZHI96ay1nU29026lmMylZabf04HaB5YmvK1eL4Fuh2yHiyQJ68sDM8E)/dm/3/x8rtkvs/s/live-1.m3u8"
//     src: "https://airtek.tv/livestream/VTV.m3u8"
//   },
// ]
