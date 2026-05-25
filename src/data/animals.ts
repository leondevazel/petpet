export type AnimalId =
  | 'dog'
  | 'cat'
  | 'rabbit'
  | 'hamster'
  | 'parrot'
  | 'turtle'
  | 'snake'
  | 'tiger'
  | 'eagle';

export type AnimalMood = 'idle' | 'happy' | 'love';

export interface AnimalData {
  id: AnimalId;
  order: number;
  name: string;
  emoji: string;
  bgColor: string;
  accentColor: string;
  maxAffinity: number;
  affinityPerStroke: number;
  messages: Record<AnimalMood, string>;
  unlockMessage: string;
}

export const ANIMALS: AnimalData[] = [
  {
    id: 'dog',
    order: 0,
    name: '강아지',
    emoji: '🐕',
    bgColor: '#FFF3E0',
    accentColor: '#E65100',
    maxAffinity: 100,
    affinityPerStroke: 3,
    messages: {
      idle: '멍멍! 놀아주세요! 🐾',
      happy: '꼬리가 빙글빙글~ 💛',
      love: '최고야! 제일 좋아해! 💕',
    },
    unlockMessage: '강아지가 당신의 친구가 되었어요!',
  },
  {
    id: 'cat',
    order: 1,
    name: '고양이',
    emoji: '🐈',
    bgColor: '#EDE7F6',
    accentColor: '#6A1B9A',
    maxAffinity: 150,
    affinityPerStroke: 2,
    messages: {
      idle: '...뭘 봐',
      happy: '그루르르르... 😽',
      love: '...인정한다. 주인으로.',
    },
    unlockMessage: '도도한 고양이가 마음을 열었어요!',
  },
  {
    id: 'rabbit',
    order: 2,
    name: '토끼',
    emoji: '🐇',
    bgColor: '#E8F5E9',
    accentColor: '#2E7D32',
    maxAffinity: 120,
    affinityPerStroke: 2.5,
    messages: {
      idle: '살금살금... 👀',
      happy: '귀를 쫑긋! 🐰',
      love: '폴짝폴짝! 너무 좋아!',
    },
    unlockMessage: '수줍은 토끼와 친구가 되었어요!',
  },
  {
    id: 'hamster',
    order: 3,
    name: '햄스터',
    emoji: '🐹',
    bgColor: '#FFFDE7',
    accentColor: '#E65100',
    maxAffinity: 100,
    affinityPerStroke: 3,
    messages: {
      idle: '볼에 씨앗 모으는 중 🌰',
      happy: '쪼르르르~ 🐹',
      love: '볼살이 두배가 됐어요! ♡',
    },
    unlockMessage: '장난꾸러기 햄스터 등장!',
  },
  {
    id: 'parrot',
    order: 4,
    name: '앵무새',
    emoji: '🦜',
    bgColor: '#E8F5E9',
    accentColor: '#1B5E20',
    maxAffinity: 140,
    affinityPerStroke: 2,
    messages: {
      idle: '안녕! 안녕! 🦜',
      happy: '예쁘다~ 예쁘다~ 💚',
      love: '사랑해! 사랑해! 사랑해! 💚',
    },
    unlockMessage: '수다쟁이 앵무새가 친구가 되었어요!',
  },
  {
    id: 'turtle',
    order: 5,
    name: '거북이',
    emoji: '🐢',
    bgColor: '#E0F2F1',
    accentColor: '#00695C',
    maxAffinity: 200,
    affinityPerStroke: 1.5,
    messages: {
      idle: '...천천히... 🐢',
      happy: '따뜻하다... 🌿',
      love: '평생 함께해요. 🍀',
    },
    unlockMessage: '느긋한 거북이가 마음을 열었어요!',
  },
  {
    id: 'snake',
    order: 6,
    name: '뱀',
    emoji: '🐍',
    bgColor: '#F1F8E9',
    accentColor: '#33691E',
    maxAffinity: 180,
    affinityPerStroke: 1.5,
    messages: {
      idle: '...스ㅡ... 🐍',
      happy: '쉬ㅡ쉬ㅡ... 🌿',
      love: '감쌀게요... 💚',
    },
    unlockMessage: '신비로운 뱀이 마음을 허락했어요!',
  },
  {
    id: 'tiger',
    order: 7,
    name: '호랑이',
    emoji: '🐯',
    bgColor: '#FFF8E1',
    accentColor: '#E65100',
    maxAffinity: 250,
    affinityPerStroke: 1,
    messages: {
      idle: '으르렁... 🐯',
      happy: '...그루르... 🔥',
      love: '인정한다. 용감한 자여.',
    },
    unlockMessage: '용맹한 호랑이가 당신을 인정했어요!',
  },
  {
    id: 'eagle',
    order: 8,
    name: '독수리',
    emoji: '🦅',
    bgColor: '#E3F2FD',
    accentColor: '#1A237E',
    maxAffinity: 300,
    affinityPerStroke: 1,
    messages: {
      idle: '...... 🦅',
      happy: '날개를 펼친다. 🌤',
      love: '하늘 끝까지 함께 날자.',
    },
    unlockMessage: '하늘의 왕 독수리가 어깨에 내려앉았어요!',
  },
];
