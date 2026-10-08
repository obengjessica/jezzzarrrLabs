import logo from '../assets/extracted/altfit-logo-cropped.png'
import referenceHero from '../assets/extracted/altfit-reference-hero.png'
import knitCapModel from '../assets/Altfit-modelknits-burgundy-cap.jpeg.png'
import knitCapModelPink from '../assets/Altfit-modelknits-pink-cap.jpeg.png'
import knitCapModelBlue from '../assets/Altfit-modelknits-blue-cap.jpeg.png'
import knitCapModelGlacier from '../assets/Altfit-modelknits-glacier-cap.jpeg.png'
import knitCapModelOrange from '../assets/Altfit-modelknits-orange-cap.jpeg.png'
import knitCapModelStreetClose from '../assets/Altfit-modelknits-1.jpeg'
import knitCapModelStreetFull from '../assets/Altfit-modelknits-2.jpeg'
import campaignDannel from '../assets/altfit-model-Dannel.png'
import campaignZee from '../assets/altfit-model-Zee.png'
import campaignKen from '../assets/altfit-model-ken.png'
import campaignRilly from '../assets/altfit-model-rilly.png'
import campaignDuo from '../assets/altfit-models-Ben-and-Olili.png'
import campaignRillyKen from '../assets/altfit-models-Rilly-and-ken.png'
import campaignZeeOne from '../assets/altfit-model-zee1.png'
import campaignZeeTwo from '../assets/altfit-model-zee2.png'
import campaignDuoTwo from '../assets/altfit-models-ben-and-olili-2.png'
import campaignRillyKenTwo from '../assets/altfit-models-rilly-and-ken-1.png'
import campaignRillyKenThree from '../assets/alftfit-models-rilly-and-ken-2.png'
import careTeesModel from "../assets/altfit-v1.0-don't-care-oversized-Tee-modeling wear.png"
import careTees from "../assets/altfit-v1.0-don't-care-oversized-Tee.png"
import gemJeans from '../assets/altfit-v1.0-gem-jeans.png'
import prettyDamn from '../assets/altfit-v1.0-pretty-damn-oversize-top-black-and-white.png'
import leopardHoodieFront from '../assets/altfit-v1.2-leopard-gen-front-hoodies.png'
import leopardHoodieBack from '../assets/altfit-v1.2-leopard-gen-back-hoodies.png'
import leopardTrousers from '../assets/altfit-v1.2-leopard-gen-front-trouser.png'
import collectionBoard from '../assets/altfit-v1.2-leopard-gen-full-stock.png'
import softGirlEra from '../assets/altfit-soft-girl-era-all.png'
import softGirlEraGlacier from '../assets/altfit-soft-girl-era-glacier.png'
import softGirlEraWhite from '../assets/altfit-soft-girl-era-white.png'
import softGirlEraPink from '../assets/altfit-soft-girl-era-pink.png'
import thunderCapBlack from '../assets/thunder-cap-black.jpeg'
import thunderCapBlue from '../assets/thunder-cap-blue.jpeg'
import thunderCapBrown from '../assets/thunder-cap-brown.jpeg'
import thunderCapBurgundy from '../assets/thunder-cap-burgundy.jpeg'
import thunderCapGlacier from '../assets/thunder-cap-glacier.jpeg'
import thunderCapOrange from '../assets/thunder-cap-orange.jpeg'
import thunderCapPink from '../assets/thunder-cap-pink.jpeg'
import thunderCapRed from '../assets/thunder-cap-red.jpeg'
import thunderCapWhite from '../assets/thunder-cap-white.jpeg'
import thunderCapYellow from '../assets/thunder-cap-yellow.jpeg'
import packagingVideo from '../assets/altfit-logo-and-sales-bag-for-packaging-vid.mp4'
import jeansVideo from '../assets/altfit-v1.0-gem-jeans-short-video.mp4'

export const altfitMedia = {
  logo,
  hero: referenceHero,
  knitCapModel,
  knitCapCampaign: [
    knitCapModel,
    knitCapModelPink,
    knitCapModelBlue,
    knitCapModelGlacier,
    knitCapModelOrange,
    knitCapModelStreetClose,
    knitCapModelStreetFull,
  ],
  campaign: [campaignDannel, campaignZee, campaignKen, campaignRilly, campaignDuo, campaignRillyKen],
  models: [
    { image: campaignDannel, name: 'Dannel', collection: 'Campaign' },
    { image: campaignZee, name: 'Zee', collection: 'Campaign' },
    { image: campaignKen, name: 'Ken', collection: 'Campaign' },
    { image: campaignRilly, name: 'Rilly', collection: 'Campaign' },
    { image: campaignDuo, name: 'Ben & Olili', collection: 'Campaign duo' },
    { image: campaignRillyKen, name: 'Rilly & Ken', collection: 'Campaign duo' },
    { image: campaignZeeOne, name: 'Zee / Look 02', collection: 'Model archive' },
    { image: campaignZeeTwo, name: 'Zee / Look 03', collection: 'Model archive' },
    { image: campaignDuoTwo, name: 'Ben & Olili / Look 02', collection: 'Campaign duo' },
    { image: campaignRillyKenTwo, name: 'Rilly & Ken / Look 02', collection: 'Campaign duo' },
    { image: campaignRillyKenThree, name: 'Rilly & Ken / Look 03', collection: 'Campaign duo' },
    { image: careTeesModel, name: "Don't Care / On model", collection: 'Product fit' },
    { image: knitCapModel, name: 'Thunder / Burgundy', collection: 'Knit cap campaign' },
    { image: knitCapModelPink, name: 'Thunder / Pink', collection: 'Knit cap campaign' },
    { image: knitCapModelBlue, name: 'Thunder / Blue', collection: 'Knit cap campaign' },
    { image: knitCapModelGlacier, name: 'Thunder / Glacier', collection: 'Knit cap campaign' },
    { image: knitCapModelOrange, name: 'Thunder / Orange', collection: 'Knit cap campaign' },
    { image: knitCapModelStreetClose, name: 'Thunder / Street detail', collection: 'Knit cap campaign' },
    { image: knitCapModelStreetFull, name: 'Thunder / Street look', collection: 'Knit cap campaign' },
  ],
  products: [careTees, gemJeans, prettyDamn],
  collection: [leopardHoodieFront, leopardHoodieBack, leopardTrousers, collectionBoard],
  extras: {
    softGirlEra: [
      { name: 'Glacier', swatch: '#a8c4d2', image: softGirlEraGlacier },
      { name: 'White', swatch: '#f2f0ea', image: softGirlEraWhite },
      { name: 'Pink', swatch: '#e99db6', image: softGirlEraPink },
      { name: 'All colors', swatch: 'linear-gradient(135deg, #a8c4d2 25%, #f2f0ea 25% 50%, #e99db6 50% 75%, #a8c4d2 75%)', image: softGirlEra },
    ],
    thunderCap: [
      { name: 'Black', swatch: '#161616', image: thunderCapBlack },
      { name: 'Blue', swatch: '#426eab', image: thunderCapBlue },
      { name: 'Brown', swatch: '#765238', image: thunderCapBrown },
      { name: 'Burgundy', swatch: '#742d46', image: thunderCapBurgundy },
      { name: 'Glacier', swatch: '#a8c4d2', image: thunderCapGlacier },
      { name: 'Orange', swatch: '#e37934', image: thunderCapOrange },
      { name: 'Pink', swatch: '#e99db6', image: thunderCapPink },
      { name: 'Red', swatch: '#bb3131', image: thunderCapRed },
      { name: 'White', swatch: '#f2f0ea', image: thunderCapWhite },
      { name: 'Yellow', swatch: '#e8c947', image: thunderCapYellow },
    ],
  },
  videos: [packagingVideo, jeansVideo],
}

export const altfitServices = [
  ['Apparel concepts', 'From first silhouette to a considered capsule collection.'],
  ['Streetwear direction', 'A visual world, styling language, and product direction built to stand out.'],
  ['Digital fashion', 'Concept visuals and campaign-ready fashion worlds for the next drop.'],
  ['Creative production', 'Photography, short-form video, and launch assets for the collection.'],
]
