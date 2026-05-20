import { useId } from 'react';
import {
  Defs,
  FeColorMatrix,
  Filter,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
  Svg,
} from 'react-native-svg';

type RatingEmojiProps = {
  emoji: 1 | 2 | 3 | 4 | 5;
  grayscale?: boolean;
  size: number;
};

const FrowningFace = ({ id }: { id: string }) => (
  <>
    <Path
      d="M40 70.4762C56.8315 70.4762 70.4762 56.8315 70.4762 40C70.4762 23.1685 56.8315 9.5238 40 9.5238C23.1685 9.5238 9.5238 23.1685 9.5238 40C9.5238 56.8315 23.1685 70.4762 40 70.4762Z"
      fill={`url(#${id}_paint0_radial)`}
    />
    <Path
      opacity={0.5}
      d="M40 70.4762C56.8315 70.4762 70.4762 56.8315 70.4762 40C70.4762 23.1685 56.8315 9.5238 40 9.5238C23.1685 9.5238 9.5238 23.1685 9.5238 40C9.5238 56.8315 23.1685 70.4762 40 70.4762Z"
      fill={`url(#${id}_paint1_radial)`}
    />
    <Path
      d="M33.4093 25.5047C33.3331 24.038 31.9617 23.1999 29.695 23.3142C27.7712 23.4285 23.5998 24.9333 20.9331 29.5809C20.4379 30.438 21.295 30.8571 21.7903 30.2856C23.4855 28.3618 28.1522 25.7523 31.9236 26.038C33.4474 26.1523 33.4093 25.5047 33.4093 25.5047Z"
      fill={`url(#${id}_paint2_linear)`}
    />
    <Path
      d="M30.0572 41.3144C31.6773 41.3144 32.9906 39.3274 32.9906 36.8763C32.9906 34.4252 31.6773 32.4382 30.0572 32.4382C28.4372 32.4382 27.1239 34.4252 27.1239 36.8763C27.1239 39.3274 28.4372 41.3144 30.0572 41.3144Z"
      fill={`url(#${id}_paint3_radial)`}
    />
    <Path
      d="M30.0572 33.943C31.3144 33.943 32.4191 35.0478 32.9906 36.6668C32.9525 34.2668 31.6572 32.343 30.0572 32.343C28.4572 32.343 27.162 34.2668 27.1239 36.6668C27.6953 35.0287 28.781 33.943 30.0572 33.943Z"
      fill={`url(#${id}_paint4_linear)`}
    />
    <Path
      d="M49.9431 41.3144C51.5631 41.3144 52.8764 39.3274 52.8764 36.8763C52.8764 34.4252 51.5631 32.4382 49.9431 32.4382C48.323 32.4382 47.0098 34.4252 47.0098 36.8763C47.0098 39.3274 48.323 41.3144 49.9431 41.3144Z"
      fill={`url(#${id}_paint5_radial)`}
    />
    <Path
      d="M46.5904 25.5999C46.6666 24.1332 48.038 23.2951 50.3047 23.4094C52.2285 23.5237 56.3999 25.0285 59.0666 29.6761C59.5618 30.5332 58.7047 30.9523 58.2095 30.3809C56.5142 28.4571 51.8476 25.8475 48.0761 26.1332C46.5523 26.2666 46.5904 25.5999 46.5904 25.5999Z"
      fill={`url(#${id}_paint6_linear)`}
    />
    <Path
      d="M49.9431 34.0382C48.6859 34.0382 47.5812 35.143 47.0098 36.762C47.0479 34.362 48.3431 32.4382 49.9431 32.4382C51.5431 32.4382 52.8383 34.362 52.8764 36.762C52.305 35.143 51.2193 34.0382 49.9431 34.0382Z"
      fill={`url(#${id}_paint7_linear)`}
    />
    <Path
      d="M53.4475 57.5237C54.038 57.0475 54.1523 56.1713 53.6951 55.5618C51.0094 51.9428 46.7237 48.6856 39.9999 48.6856C33.2761 48.6856 28.9903 51.9428 26.3046 55.5618C25.8475 56.1713 25.9618 57.0475 26.5523 57.5237C27.1808 58.038 28.1332 57.9237 28.6094 57.257C30.9142 54.2094 34.438 51.657 39.9808 51.657C45.5237 51.657 49.0665 54.2094 51.3522 57.257C51.8665 57.9237 52.7999 58.038 53.4475 57.5237Z"
      fill={`url(#${id}_paint8_radial)`}
    />
    <Path
      d="M53.9619 56.5713C54 56.2285 53.9238 55.8666 53.6952 55.5618C51.0095 51.9428 46.7238 48.6856 39.9999 48.6856C33.2761 48.6856 28.9904 51.9428 26.3047 55.5618C26.0761 55.8666 25.9999 56.2285 26.038 56.5713C28.9523 53.0285 33.3714 50.038 39.9999 50.038C46.6285 50.038 51.0666 53.0285 53.9619 56.5713Z"
      fill={`url(#${id}_paint9_linear)`}
    />
    <Defs>
      <RadialGradient
        id={`${id}_paint0_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(34.0037 27.6553) scale(36.7656)"
      >
        <Stop stopColor="#FFE030" />
        <Stop offset={1} stopColor="#FFB92E" />
      </RadialGradient>
      <RadialGradient
        id={`${id}_paint1_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(34.0037 27.6553) scale(28.9251)"
      >
        <Stop stopColor="#FFEA5F" />
        <Stop offset={1} stopColor="#FFBC47" stopOpacity={0} />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint2_linear`}
        x1={27.13}
        y1={28.2896}
        x2={26.918}
        y2={24.4428}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#7A4400" />
      </LinearGradient>
      <RadialGradient
        id={`${id}_paint3_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(29.1626 36.9869) rotate(73.8539) scale(4.30606 2.78595)"
      >
        <Stop offset={0.00132565} stopColor="#7A4400" />
        <Stop offset={1} stopColor="#643800" />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint4_linear`}
        x1={30.05}
        y1={32.4083}
        x2={30.05}
        y2={36.5443}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
      <RadialGradient
        id={`${id}_paint5_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(49.0638 36.9876) rotate(73.854) scale(4.30606 2.78595)"
      >
        <Stop offset={0.00132565} stopColor="#7A4400" />
        <Stop offset={1} stopColor="#643800" />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint6_linear`}
        x1={52.888}
        y1={28.3994}
        x2={53.0999}
        y2={24.5525}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#7A4400" />
      </LinearGradient>
      <LinearGradient
        id={`${id}_paint7_linear`}
        x1={49.9503}
        y1={32.5171}
        x2={49.9503}
        y2={36.6532}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
      <RadialGradient
        id={`${id}_paint8_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(46.1042 49.2918) scale(11.8411 13.3556)"
      >
        <Stop offset={0.00132565} stopColor="#7A4400" />
        <Stop offset={1} stopColor="#643800" />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint9_linear`}
        x1={26.0199}
        y1={52.6281}
        x2={53.98}
        y2={52.6281}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
    </Defs>
  </>
);

const SlightlyFrowningFace = ({ id }: { id: string }) => (
  <>
    <Path
      d="M40 70.4762C56.8315 70.4762 70.4762 56.8315 70.4762 40C70.4762 23.1685 56.8315 9.52381 40 9.52381C23.1685 9.52381 9.5238 23.1685 9.5238 40C9.5238 56.8315 23.1685 70.4762 40 70.4762Z"
      fill={`url(#${id}_paint0_radial)`}
    />
    <Path
      opacity={0.5}
      d="M40 70.4762C56.8315 70.4762 70.4762 56.8315 70.4762 40C70.4762 23.1685 56.8315 9.52381 40 9.52381C23.1685 9.52381 9.5238 23.1685 9.5238 40C9.5238 56.8315 23.1685 70.4762 40 70.4762Z"
      fill={`url(#${id}_paint1_radial)`}
    />
    <Path
      d="M34.8 29.276C35.1238 28.0951 34.0381 27.0093 31.8476 26.4189C29.9809 25.9236 25.619 25.8474 21.8285 28.7236C21.1238 29.257 21.8285 29.8284 22.4571 29.5427C24.5904 28.5332 29.7333 27.8855 33.2571 29.257C34.6666 29.8093 34.8 29.276 34.8 29.276Z"
      fill={`url(#${id}_paint2_linear)`}
    />
    <Path
      d="M30.0382 41.6381C31.6582 41.6381 32.9715 39.6511 32.9715 37.2C32.9715 34.7489 31.6582 32.7619 30.0382 32.7619C28.4182 32.7619 27.1049 34.7489 27.1049 37.2C27.1049 39.6511 28.4182 41.6381 30.0382 41.6381Z"
      fill={`url(#${id}_paint3_radial)`}
    />
    <Path
      d="M30.0382 34.2473C31.2953 34.2473 32.4001 35.3521 32.9715 36.9711C32.9334 34.5711 31.6382 32.6473 30.0382 32.6473C28.4382 32.6473 27.143 34.5711 27.1049 36.9711C27.6763 35.3521 28.7811 34.2473 30.0382 34.2473Z"
      fill={`url(#${id}_paint4_linear)`}
    />
    <Path
      d="M27.219 58.3621C27.4667 58.4002 27.6952 58.324 27.8667 58.1716C30.9714 55.4287 35.7714 53.943 39.3714 53.943H40H40.6286C44.2286 53.943 49.0286 55.4287 52.1333 58.1716C52.3047 58.324 52.5524 58.4002 52.7809 58.3621C53.0286 58.324 53.1619 58.0573 53.0285 57.8478C50.3809 53.5049 45.4667 50.8192 40.1524 50.8192H40H39.8476C34.5143 50.8192 29.619 53.5049 26.9714 57.8478C26.8191 58.0573 26.9524 58.324 27.219 58.3621Z"
      fill="#643800"
    />
    <Path
      d="M27.2191 58.3618C27.4668 58.3998 27.6953 58.3237 27.8668 58.1713C30.9715 55.4284 35.7715 53.9427 39.3715 53.9427H40.0001H40.6287C44.2287 53.9427 49.0287 55.4284 52.1334 58.1713C52.3049 58.3237 52.5525 58.3998 52.7811 58.3618C53.0287 58.3237 53.162 58.057 53.0287 57.8475C53.0096 57.8094 52.9715 57.7713 52.9525 57.7141C52.7049 57.8475 52.4382 57.9808 52.1525 57.6951C49.2001 54.5713 44.8382 52.7046 40.1525 52.7046H39.981H39.8096C35.1049 52.7046 30.7049 54.5903 27.7525 57.7713C27.4858 58.057 27.2382 57.9237 26.9906 57.7713C26.9715 57.8094 26.9525 57.8284 26.9334 57.8665C26.8191 58.057 26.9525 58.3237 27.2191 58.3618Z"
      fill={`url(#${id}_paint5_linear)`}
    />
    <Path
      d="M45.2001 29.276C44.8763 28.0951 45.962 27.0093 48.1524 26.4189C50.0191 25.9236 54.381 25.8474 58.1715 28.7236C58.8763 29.257 58.1715 29.8284 57.5429 29.5427C55.4096 28.5332 50.2667 27.8855 46.7429 29.257C45.3334 29.8093 45.2001 29.276 45.2001 29.276Z"
      fill={`url(#${id}_paint6_linear)`}
    />
    <Path
      d="M49.943 41.6381C51.563 41.6381 52.8763 39.6511 52.8763 37.2C52.8763 34.7489 51.563 32.7619 49.943 32.7619C48.3229 32.7619 47.0096 34.7489 47.0096 37.2C47.0096 39.6511 48.3229 41.6381 49.943 41.6381Z"
      fill={`url(#${id}_paint7_radial)`}
    />
    <Path
      d="M49.943 34.2473C51.2001 34.2473 52.3049 35.3521 52.8763 36.9711C52.8382 34.5711 51.543 32.6473 49.943 32.6473C48.343 32.6473 47.0477 34.5711 47.0096 36.9711C47.5811 35.3521 48.6858 34.2473 49.943 34.2473Z"
      fill={`url(#${id}_paint8_linear)`}
    />
    <Defs>
      <RadialGradient
        id={`${id}_paint0_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(33.9962 27.649) scale(36.7656)"
      >
        <Stop stopColor="#FFE030" />
        <Stop offset={1} stopColor="#FFB92E" />
      </RadialGradient>
      <RadialGradient
        id={`${id}_paint1_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(33.9962 27.649) scale(28.9251)"
      >
        <Stop stopColor="#FFEA5F" />
        <Stop offset={1} stopColor="#FFBC47" stopOpacity={0} />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint2_linear`}
        x1={27.5486}
        y1={31.4939}
        x2={28.8653}
        y2={26.5798}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#7A4400" />
      </LinearGradient>
      <RadialGradient
        id={`${id}_paint3_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(29.1656 37.3125) rotate(73.8539) scale(4.30607 2.78596)"
      >
        <Stop offset={0.00132565} stopColor="#7A4400" />
        <Stop offset={1} stopColor="#643800" />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint4_linear`}
        x1={30.0425}
        y1={32.6464}
        x2={30.0425}
        y2={36.9741}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
      <LinearGradient
        id={`${id}_paint5_linear`}
        x1={39.9927}
        y1={51.1228}
        x2={39.9927}
        y2={55.39}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
      <LinearGradient
        id={`${id}_paint6_linear`}
        x1={52.3969}
        y1={31.612}
        x2={51.0802}
        y2={26.6978}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#7A4400" />
      </LinearGradient>
      <RadialGradient
        id={`${id}_paint7_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(49.0663 37.3129) rotate(73.8539) scale(4.30607 2.78596)"
      >
        <Stop offset={0.00132565} stopColor="#7A4400" />
        <Stop offset={1} stopColor="#643800" />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint8_linear`}
        x1={49.9427}
        y1={32.6464}
        x2={49.9427}
        y2={36.9741}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
    </Defs>
  </>
);

const NeutralFace = ({ id }: { id: string }) => (
  <>
    <Path
      d="M40 70.4762C56.8315 70.4762 70.4762 56.8315 70.4762 40C70.4762 23.1685 56.8315 9.52381 40 9.52381C23.1685 9.52381 9.5238 23.1685 9.5238 40C9.5238 56.8315 23.1685 70.4762 40 70.4762Z"
      fill={`url(#${id}_paint0_radial)`}
    />
    <Path
      opacity={0.5}
      d="M40 70.4762C56.8315 70.4762 70.4762 56.8315 70.4762 40C70.4762 23.1685 56.8315 9.52381 40 9.52381C23.1685 9.52381 9.5238 23.1685 9.5238 40C9.5238 56.8315 23.1685 70.4762 40 70.4762Z"
      fill={`url(#${id}_paint1_radial)`}
    />
    <Path
      d="M34.4952 26.6668C34.6857 25.2192 33.4857 24.1335 31.2381 23.8477C29.3143 23.6001 24.9524 24.3239 21.4857 28.4192C20.8381 29.1811 21.6 29.7335 22.2095 29.2763C24.2286 27.6954 29.2952 25.9811 32.9524 26.9525C34.419 27.3144 34.4952 26.6668 34.4952 26.6668Z"
      fill={`url(#${id}_paint2_linear)`}
    />
    <Path
      d="M30.0569 41.2951C31.6769 41.2951 32.9902 39.3081 32.9902 36.857C32.9902 34.4059 31.6769 32.4189 30.0569 32.4189C28.4368 32.4189 27.1235 34.4059 27.1235 36.857C27.1235 39.3081 28.4368 41.2951 30.0569 41.2951Z"
      fill={`url(#${id}_paint3_radial)`}
    />
    <Path
      d="M30.0569 33.9236C31.314 33.9236 32.4188 35.0284 32.9902 36.6475C32.9521 34.2475 31.6569 32.3236 30.0569 32.3236C28.4569 32.3236 27.1616 34.2475 27.1235 36.6475C27.695 35.0284 28.7807 33.9236 30.0569 33.9236Z"
      fill={`url(#${id}_paint4_linear)`}
    />
    <Path
      d="M49.943 41.2951C51.563 41.2951 52.8763 39.3081 52.8763 36.857C52.8763 34.4059 51.563 32.4189 49.943 32.4189C48.3229 32.4189 47.0096 34.4059 47.0096 36.857C47.0096 39.3081 48.3229 41.2951 49.943 41.2951Z"
      fill={`url(#${id}_paint5_radial)`}
    />
    <Path
      d="M49.943 34.0383C48.6858 34.0383 47.5811 35.143 47.0096 36.7621C47.0477 34.3621 48.343 32.4383 49.943 32.4383C51.543 32.4383 52.8382 34.3621 52.8763 36.7621C52.3049 35.143 51.2192 34.0383 49.943 34.0383Z"
      fill={`url(#${id}_paint6_linear)`}
    />
    <Path
      d="M45.5045 26.6668C45.3141 25.2192 46.5141 24.1335 48.7617 23.8477C50.6855 23.6001 55.0474 24.3239 58.5141 28.4192C59.1617 29.1811 58.3998 29.7335 57.7903 29.2763C55.7712 27.6954 50.7046 25.9811 47.0474 26.9525C45.5807 27.3144 45.5045 26.6668 45.5045 26.6668Z"
      fill={`url(#${id}_paint7_linear)`}
    />
    <Path
      d="M52.8384 53.2954H27.1622C26.3813 53.2954 25.7336 52.6478 25.7336 51.8668C25.7336 51.0859 26.3813 50.4383 27.1622 50.4383H52.8384C53.6194 50.4383 54.267 51.0859 54.267 51.8668C54.267 52.6478 53.6194 53.2954 52.8384 53.2954Z"
      fill={`url(#${id}_paint8_radial)`}
    />
    <Path
      d="M27.0289 51.2002H52.9908C53.5432 51.2002 54.0384 51.524 54.267 51.9811C54.267 51.943 54.267 51.9049 54.267 51.8668C54.267 51.0859 53.6194 50.4383 52.8384 50.4383H27.1622C26.3813 50.4383 25.7336 51.0859 25.7336 51.8668C25.7336 51.9049 25.7336 51.943 25.7336 51.9811C25.9813 51.5049 26.4575 51.2002 27.0289 51.2002Z"
      fill={`url(#${id}_paint9_linear)`}
    />
    <Defs>
      <RadialGradient
        id={`${id}_paint0_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(34.0037 27.649) scale(36.7656)"
      >
        <Stop stopColor="#FFE030" />
        <Stop offset={1} stopColor="#FFB92E" />
      </RadialGradient>
      <RadialGradient
        id={`${id}_paint1_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(34.0037 27.649) scale(28.9251)"
      >
        <Stop stopColor="#FFEA5F" />
        <Stop offset={1} stopColor="#FFBC47" stopOpacity={0} />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint2_linear`}
        x1={27.8133}
        y1={28.281}
        x2={28.3072}
        y2={24.4601}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#7A4400" />
      </LinearGradient>
      <RadialGradient
        id={`${id}_paint3_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(29.1594 36.974) rotate(73.8539) scale(4.30606 2.78596)"
      >
        <Stop offset={0.00132565} stopColor="#7A4400" />
        <Stop offset={1} stopColor="#643800" />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint4_linear`}
        x1={30.0497}
        y1={32.4017}
        x2={30.0497}
        y2={36.5378}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
      <RadialGradient
        id={`${id}_paint5_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(49.0609 36.9747) rotate(73.8539) scale(4.30607 2.78596)"
      >
        <Stop offset={0.00132565} stopColor="#7A4400" />
        <Stop offset={1} stopColor="#643800" />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint6_linear`}
        x1={49.9503}
        y1={32.5109}
        x2={49.9503}
        y2={36.6469}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
      <LinearGradient
        id={`${id}_paint7_linear`}
        x1={52.1874}
        y1={28.282}
        x2={51.6935}
        y2={24.4611}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#7A4400" />
      </LinearGradient>
      <RadialGradient
        id={`${id}_paint8_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(40.0003 51.8589) scale(10.1385 1.82392)"
      >
        <Stop offset={0.00132565} stopColor="#7A4400" />
        <Stop offset={1} stopColor="#643800" />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint9_linear`}
        x1={25.7336}
        y1={51.1992}
        x2={54.267}
        y2={51.1992}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
    </Defs>
  </>
);

const SlightlySmilingFace = ({ id }: { id: string }) => (
  <>
    <Path
      d="M40.0001 70.4762C56.8316 70.4762 70.4763 56.8315 70.4763 40C70.4763 23.1685 56.8316 9.5238 40.0001 9.5238C23.1686 9.5238 9.52393 23.1685 9.52393 40C9.52393 56.8315 23.1686 70.4762 40.0001 70.4762Z"
      fill={`url(#${id}_paint0_radial)`}
    />
    <Path
      opacity={0.5}
      d="M40.0001 70.4762C56.8316 70.4762 70.4763 56.8315 70.4763 40C70.4763 23.1685 56.8316 9.5238 40.0001 9.5238C23.1686 9.5238 9.52393 23.1685 9.52393 40C9.52393 56.8315 23.1686 70.4762 40.0001 70.4762Z"
      fill={`url(#${id}_paint1_radial)`}
    />
    <Path
      d="M33.2953 24.2095C33.2953 22.9905 31.981 22.2286 29.6953 22.2286C27.7715 22.2286 23.5239 23.2952 20.6096 27.0476C20.0763 27.7333 20.8953 28.1143 21.4286 27.6762C23.2191 26.1524 28.0382 24.1905 31.7905 24.6095C33.2953 24.7619 33.2953 24.2095 33.2953 24.2095Z"
      fill={`url(#${id}_paint2_linear)`}
    />
    <Path
      d="M30.0383 39.0096C31.6584 39.0096 32.9717 37.0225 32.9717 34.5715C32.9717 32.1204 31.6584 30.1334 30.0383 30.1334C28.4183 30.1334 27.105 32.1204 27.105 34.5715C27.105 37.0225 28.4183 39.0096 30.0383 39.0096Z"
      fill={`url(#${id}_paint3_radial)`}
    />
    <Path
      d="M30.0383 31.6381C31.2955 31.6381 32.4002 32.7428 32.9717 34.3619C32.9336 31.9619 31.6383 30.0381 30.0383 30.0381C28.4383 30.0381 27.1431 31.9619 27.105 34.3619C27.6764 32.7428 28.7812 31.6381 30.0383 31.6381Z"
      fill={`url(#${id}_paint4_linear)`}
    />
    <Path
      d="M46.7048 24.2095C46.7048 22.9905 48.0191 22.2286 50.3049 22.2286C52.2287 22.2286 56.4763 23.2952 59.3906 27.0476C59.9239 27.7333 59.1049 28.1143 58.5715 27.6762C56.7811 26.1524 51.962 24.1905 48.2096 24.6095C46.6858 24.7619 46.7048 24.2095 46.7048 24.2095Z"
      fill={`url(#${id}_paint5_linear)`}
    />
    <Path
      d="M53.4667 48.9143C53.2191 48.8762 52.9524 48.9524 52.781 49.1238C49.5048 52.1905 44.4571 53.8476 40.6476 53.8476H40H39.3524C35.5429 53.8476 30.4952 52.1905 27.219 49.1238C27.0286 48.9524 26.781 48.8762 26.5333 48.9143C26.2667 48.9714 26.1333 49.2571 26.2667 49.4857C29.0667 54.3238 34.2286 57.3143 39.8476 57.3143H40.0191H40.1905C45.8095 57.3143 50.9714 54.3238 53.7714 49.4857C53.8667 49.2571 53.7333 48.9714 53.4667 48.9143Z"
      fill="#643800"
    />
    <Path
      d="M49.9429 39.0096C51.5629 39.0096 52.8762 37.0225 52.8762 34.5715C52.8762 32.1204 51.5629 30.1334 49.9429 30.1334C48.3228 30.1334 47.0095 32.1204 47.0095 34.5715C47.0095 37.0225 48.3228 39.0096 49.9429 39.0096Z"
      fill={`url(#${id}_paint6_radial)`}
    />
    <Path
      d="M49.9429 31.6381C48.6857 31.6381 47.581 32.7429 47.0095 34.362C47.0476 31.962 48.3429 30.0381 49.9429 30.0381C51.5429 30.0381 52.8381 31.962 52.8762 34.362C52.3048 32.7429 51.2 31.6381 49.9429 31.6381Z"
      fill={`url(#${id}_paint7_linear)`}
    />
    <Path
      d="M53.4667 48.9143C53.219 48.8762 52.9524 48.9524 52.7809 49.1238C49.5048 52.1905 44.4571 53.8476 40.6476 53.8476H40H39.3524C35.5429 53.8476 30.4952 52.1905 27.219 49.1238C27.0286 48.9524 26.781 48.8762 26.5333 48.9143C26.2667 48.9714 26.1333 49.2571 26.2667 49.4857C26.2857 49.5428 26.3238 49.5809 26.3619 49.619C26.6286 49.4667 26.9143 49.3143 27.2 49.6381C30.3048 53.1238 34.9143 55.219 39.8476 55.219H40.019H40.1905C45.1619 55.219 49.7905 53.1048 52.8952 49.5619C53.1809 49.2381 53.4476 49.3905 53.6952 49.5619C53.7143 49.5238 53.7333 49.5048 53.7524 49.4667C53.8667 49.2571 53.7333 48.9714 53.4667 48.9143Z"
      fill={`url(#${id}_paint8_linear)`}
    />
    <Defs>
      <RadialGradient
        id={`${id}_paint0_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(33.9963 27.649) scale(36.7656)"
      >
        <Stop stopColor="#FFE030" />
        <Stop offset={1} stopColor="#FFB92E" />
      </RadialGradient>
      <RadialGradient
        id={`${id}_paint1_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(33.9963 27.649) scale(28.9251)"
      >
        <Stop stopColor="#FFEA5F" />
        <Stop offset={1} stopColor="#FFBC47" stopOpacity={0} />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint2_linear`}
        x1={26.8613}
        y1={26.2522}
        x2={26.8613}
        y2={23.0409}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#7A4400" />
      </LinearGradient>
      <RadialGradient
        id={`${id}_paint3_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(29.1624 34.6974) rotate(73.8539) scale(4.30606 2.78596)"
      >
        <Stop offset={0.00132565} stopColor="#7A4400" />
        <Stop offset={1} stopColor="#643800" />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint4_linear`}
        x1={30.0426}
        y1={30.1161}
        x2={30.0426}
        y2={34.2522}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
      <LinearGradient
        id={`${id}_paint5_linear`}
        x1={53.1238}
        y1={26.2522}
        x2={53.1238}
        y2={23.0409}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#7A4400" />
      </LinearGradient>
      <RadialGradient
        id={`${id}_paint6_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(49.0633 34.6981) rotate(73.8539) scale(4.30606 2.78596)"
      >
        <Stop offset={0.00132565} stopColor="#7A4400" />
        <Stop offset={1} stopColor="#643800" />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint7_linear`}
        x1={49.9425}
        y1={30.1162}
        x2={49.9425}
        y2={34.2523}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
      <LinearGradient
        id={`${id}_paint8_linear`}
        x1={39.9925}
        y1={51.0685}
        x2={39.9925}
        y2={55.6182}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
    </Defs>
  </>
);

const SmilingFace = ({ id }: { id: string }) => (
  <>
    <Path
      d="M40.0001 70.4762C56.8316 70.4762 70.4763 56.8315 70.4763 40C70.4763 23.1685 56.8316 9.5238 40.0001 9.5238C23.1686 9.5238 9.52393 23.1685 9.52393 40C9.52393 56.8315 23.1686 70.4762 40.0001 70.4762Z"
      fill={`url(#${id}_paint0_radial)`}
    />
    <Path
      opacity={0.5}
      d="M40.0001 70.4762C56.8316 70.4762 70.4763 56.8315 70.4763 40C70.4763 23.1685 56.8316 9.5238 40.0001 9.5238C23.1686 9.5238 9.52393 23.1685 9.52393 40C9.52393 56.8315 23.1686 70.4762 40.0001 70.4762Z"
      fill={`url(#${id}_paint1_radial)`}
    />
    <Path
      opacity={0.5}
      d="M40.0001 70.4762C56.8316 70.4762 70.4763 56.8315 70.4763 40C70.4763 23.1685 56.8316 9.5238 40.0001 9.5238C23.1686 9.5238 9.52393 23.1685 9.52393 40C9.52393 56.8315 23.1686 70.4762 40.0001 70.4762Z"
      fill={`url(#${id}_paint2_radial)`}
    />
    <Path
      opacity={0.5}
      d="M40.0001 70.4762C56.8316 70.4762 70.4763 56.8315 70.4763 40C70.4763 23.1685 56.8316 9.5238 40.0001 9.5238C23.1686 9.5238 9.52393 23.1685 9.52393 40C9.52393 56.8315 23.1686 70.4762 40.0001 70.4762Z"
      fill={`url(#${id}_paint3_radial)`}
    />
    <Path
      d="M40 60.2665C31.219 60.2665 28.419 50.857 31.0857 52.3237C34.6667 54.3046 36.9524 54.4951 40 54.4951C43.0476 54.4951 45.3143 54.3046 48.9143 52.3237C51.5809 50.857 48.7809 60.2665 40 60.2665Z"
      fill="#643800"
    />
    <Path
      d="M48.9144 52.3238C45.3335 54.3048 43.0478 54.4952 40.0001 54.4952C36.9525 54.4952 34.6859 54.3048 31.0859 52.3238C30.1525 51.8095 29.8859 52.6095 30.3049 53.8857C30.3049 53.8667 30.4382 52.4952 31.6954 53.4476C31.6954 53.4476 36.324 56.2286 39.9811 56.2286C43.6382 56.2286 48.2668 53.4476 48.2668 53.4476C49.5239 52.5143 49.6573 53.8667 49.6573 53.8857C50.1144 52.6095 49.8478 51.8095 48.9144 52.3238Z"
      fill={`url(#${id}_paint4_linear)`}
    />
    <Path
      d="M33.3525 28.8761C33.5239 27.6571 32.3049 26.7238 30.0573 26.4381C28.1335 26.1714 23.8097 26.6666 20.4001 30C19.7716 30.6095 20.5525 31.1047 21.124 30.7238C23.1049 29.4476 28.1335 28.1523 31.7906 29.0476C33.2763 29.4285 33.3525 28.8761 33.3525 28.8761Z"
      fill={`url(#${id}_paint5_linear)`}
    />
    <Path
      d="M46.6478 28.8761C46.4763 27.657 47.6954 26.7237 49.943 26.438C51.8668 26.1903 56.1906 26.6665 59.6002 29.9999C60.2287 30.6094 59.4478 31.1046 58.8764 30.7237C56.8954 29.4475 51.8668 28.1523 48.2097 29.0475C46.724 29.4284 46.6478 28.8761 46.6478 28.8761Z"
      fill={`url(#${id}_paint6_linear)`}
    />
    <Path
      d="M52.6287 36.3045C52.6287 36.3045 57.6572 37.1807 58.7811 41.1045C58.8572 41.3522 58.8763 41.6188 58.8572 41.8664C58.8191 42.3807 58.3049 42.876 57.4477 42.3236C52.1144 38.876 48.8192 40.076 46.362 40.9141C45.4096 41.2379 44.6477 40.2283 44.9906 39.4283C45.0858 39.1998 45.162 38.9522 45.3144 38.7426C47.6001 35.4093 52.6287 36.3045 52.6287 36.3045Z"
      fill={`url(#${id}_paint7_radial)`}
    />
    <Path
      d="M52.4193 37.5046C52.4193 37.5046 56.5145 38.2094 58.8383 41.5618C58.8193 41.4094 58.8002 41.257 58.7621 41.1046C57.6383 37.1808 52.6097 36.3046 52.6097 36.3046C52.6097 36.3046 47.6002 35.4094 45.2764 38.7237C45.1812 38.857 45.124 38.9903 45.0669 39.1237C48.3431 36.7618 52.4193 37.5046 52.4193 37.5046Z"
      fill={`url(#${id}_paint8_linear)`}
    />
    <Path
      d="M27.3714 36.3045C27.3714 36.3045 22.3429 37.1807 21.219 41.1045C21.1429 41.3522 21.1238 41.6188 21.1429 41.8664C21.181 42.3807 21.6952 42.876 22.5524 42.3236C27.8857 38.876 31.1809 40.076 33.6381 40.9141C34.5905 41.2379 35.3524 40.2283 35.0095 39.4283C34.9143 39.1998 34.8381 38.9522 34.6857 38.7426C32.4 35.4093 27.3714 36.3045 27.3714 36.3045Z"
      fill={`url(#${id}_paint9_radial)`}
    />
    <Path
      d="M27.5809 37.5046C27.5809 37.5046 23.4857 38.2094 21.1619 41.5618C21.1809 41.4094 21.2 41.257 21.2381 41.1046C22.3619 37.1808 27.3904 36.3046 27.3904 36.3046C27.3904 36.3046 32.4 35.4094 34.7238 38.7237C34.819 38.857 34.8762 38.9903 34.9333 39.1237C31.6571 36.7618 27.5809 37.5046 27.5809 37.5046Z"
      fill={`url(#${id}_paint10_linear)`}
    />
    <Defs>
      <RadialGradient
        id={`${id}_paint0_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(34.0039 27.649) scale(36.7656)"
      >
        <Stop stopColor="#FFE030" />
        <Stop offset={1} stopColor="#FFB92E" />
      </RadialGradient>
      <RadialGradient
        id={`${id}_paint1_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(34.0039 27.649) scale(28.9251)"
      >
        <Stop stopColor="#FFEA5F" />
        <Stop offset={1} stopColor="#FFBC47" stopOpacity={0} />
      </RadialGradient>
      <RadialGradient
        id={`${id}_paint2_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(23.3965 47.5816) rotate(-2.7703) scale(12.819 10.143)"
      >
        <Stop stopColor="#FF4C00" />
        <Stop offset={0.1542} stopColor="#FF4C00" />
        <Stop offset={0.1795} stopColor="#FF4C00" />
        <Stop offset={0.3996} stopColor="#FB4C0B" stopOpacity={0.7318} />
        <Stop offset={0.7799} stopColor="#EF4B27" stopOpacity={0.2683} />
        <Stop offset={1} stopColor="#E74A3A" stopOpacity={0} />
      </RadialGradient>
      <RadialGradient
        id={`${id}_paint3_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(56.5951 47.5816) rotate(-177.23) scale(12.819 10.143)"
      >
        <Stop stopColor="#FF4C00" />
        <Stop offset={0.1542} stopColor="#FF4C00" />
        <Stop offset={0.1795} stopColor="#FF4C00" />
        <Stop offset={0.3996} stopColor="#FB4C0B" stopOpacity={0.7318} />
        <Stop offset={0.7799} stopColor="#EF4B27" stopOpacity={0.2683} />
        <Stop offset={1} stopColor="#E74A3A" stopOpacity={0} />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint4_linear`}
        x1={39.9997}
        y1={48.8487}
        x2={39.9997}
        y2={56.0166}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
      <LinearGradient
        id={`${id}_paint5_linear`}
        x1={26.7086}
        y1={30.0508}
        x2={27.1357}
        y2={26.868}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#7A4400" />
      </LinearGradient>
      <LinearGradient
        id={`${id}_paint6_linear`}
        x1={53.2907}
        y1={30.0509}
        x2={52.8636}
        y2={26.8681}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#7A4400" />
      </LinearGradient>
      <RadialGradient
        id={`${id}_paint7_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(52.1362 39.13) rotate(9.98082) scale(5.47711 2.64266)"
      >
        <Stop offset={0.00132565} stopColor="#7A4400" />
        <Stop offset={1} stopColor="#643800" />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint8_linear`}
        x1={52.9287}
        y1={34.7224}
        x2={52.3353}
        y2={38.2109}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
      <RadialGradient
        id={`${id}_paint9_radial`}
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(27.9428 39.0431) rotate(170.019) scale(5.47711 2.64266)"
      >
        <Stop offset={0.00132565} stopColor="#7A4400" />
        <Stop offset={1} stopColor="#643800" />
      </RadialGradient>
      <LinearGradient
        id={`${id}_paint10_linear`}
        x1={27.0206}
        y1={34.6925}
        x2={27.614}
        y2={38.1811}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.00132565} stopColor="#3C2200" />
        <Stop offset={1} stopColor="#512D00" />
      </LinearGradient>
    </Defs>
  </>
);

const EMOJI_COMPONENTS = {
  1: FrowningFace,
  2: SlightlyFrowningFace,
  3: NeutralFace,
  4: SlightlySmilingFace,
  5: SmilingFace,
} as const;

const RatingEmoji = ({ emoji, grayscale = false, size }: RatingEmojiProps) => {
  const id = useId();
  const filterId = `${id}_grayscale`;
  const EmojiComponent = EMOJI_COMPONENTS[emoji];

  return (
    <Svg width={size} height={size} viewBox="0 0 80 80">
      {grayscale ? (
        <Defs>
          <Filter id={filterId}>
            <FeColorMatrix type="saturate" values="0" />
          </Filter>
        </Defs>
      ) : null}
      <G filter={grayscale ? `url(#${filterId})` : undefined}>
        <EmojiComponent id={id} />
      </G>
    </Svg>
  );
};

export default RatingEmoji;
