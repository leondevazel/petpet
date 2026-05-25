export type AnimalId = 'dog' | 'cat' | 'rabbit' | 'hamster' | 'bird';
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
    id: 'bird',
    order: 4,
    name: '새',
    emoji: '🐦',
    bgColor: '#E3F2FD',
    accentColor: '#1565C0',
    maxAffinity: 130,
    affinityPerStroke: 2,
    messages: {
      idle: '짹짹~ 🎵',
      happy: '날개를 퍼덕퍼덕! 🕊',
      love: '어깨 위에 앉을게요! 🎶',
    },
    unlockMessage: '새가 어깨에 앉았어요!',
  },
];
