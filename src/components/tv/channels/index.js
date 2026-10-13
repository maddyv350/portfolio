import SwifflyyScene from './Swifflyy'
import PropkeeScene from './Propkee'
import PragyanScene from './Pragyan'
import TuskinScene from './Tuskin'

export { ColourBars, Ident, TitleCard } from './Broadcast'

// `scene` keys used in data.js → animated scene. Projects without one get a TitleCard.
export const scenes = {
  swifflyy: SwifflyyScene,
  propkee: PropkeeScene,
  pragyan: PragyanScene,
  tuskin: TuskinScene,
}
