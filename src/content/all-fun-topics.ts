/**
 * all-fun-topics.ts — DANH SÁCH CHỦ ĐỀ "HỌC VUI"
 * Thêm chủ đề mới: tạo file trong fun-topics/ rồi thêm vào mảng dưới.
 */
import type { FunCard, FunTopic } from './content-types'
import { countriesTopic } from './fun-topics/countries'
import { animalsTopic } from './fun-topics/animals'
import { fruitsVegetablesTopic } from './fun-topics/fruits-vegetables'
import { foodDrinksTopic } from './fun-topics/food-drinks'
import { vehiclesTopic } from './fun-topics/vehicles'
import { householdTopic } from './fun-topics/household'
import { jobsTopic } from './fun-topics/jobs'
import { bodyTopic } from './fun-topics/body'
import { clothesTopic } from './fun-topics/clothes'
import { colorsShapesTopic } from './fun-topics/colors-shapes'
import { weatherSeasonsTopic } from './fun-topics/weather-seasons'
import { emotionsTopic } from './fun-topics/emotions'
import { sportsHobbiesTopic } from './fun-topics/sports-hobbies'
import { placesTopic } from './fun-topics/places'
import { natureTopic } from './fun-topics/nature'
import { musicalInstrumentsTopic } from './fun-topics/musical-instruments'

export const ALL_FUN_TOPICS: FunTopic[] = [
  countriesTopic,
  animalsTopic,
  natureTopic,
  weatherSeasonsTopic,
  fruitsVegetablesTopic,
  foodDrinksTopic,
  householdTopic,
  vehiclesTopic,
  clothesTopic,
  colorsShapesTopic,
  jobsTopic,
  bodyTopic,
  emotionsTopic,
  placesTopic,
  sportsHobbiesTopic,
  musicalInstrumentsTopic,
]

export function findFunTopic(topicId: string): FunTopic | undefined {
  return ALL_FUN_TOPICS.find((topic) => topic.id === topicId)
}

/** Tất cả thẻ của mọi chủ đề. */
export function allFunCards(): FunCard[] {
  return ALL_FUN_TOPICS.flatMap((topic) => topic.cards)
}
