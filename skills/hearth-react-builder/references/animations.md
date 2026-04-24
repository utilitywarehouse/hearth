# Animations (`@utilitywarehouse/hearth-json-assets`)

44 Lottie JSON animations. Use with the `lottie-react` package.

```tsx
import Lottie from 'lottie-react';
import AnimatedSpotSuccess from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-success-light.json';
import AnimatedSpotProcessCompleteCelebratory from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-process-complete-celebratory-light.json';

<Lottie
  animationData={AnimatedSpotSuccess}
  style={{ width: 200, height: 200 }}
/>
```

**Import pattern:** `@utilitywarehouse/hearth-json-assets/lib/{kebab-case-filename}.json`

The filenames use kebab-case derived from the asset name — e.g. `AnimatedSpotBookAppointments` → `animated-spot-book-appointments-light.json`.

**When to use:** Animations should add genuine value — success states, loading transitions, and celebratory moments. Don't use motion for purely decorative purposes.

**Accessibility:** Always respect `prefers-reduced-motion`. Fall back to the equivalent static spot illustration from `@utilitywarehouse/hearth-svg-assets`:

```tsx
import Lottie from 'lottie-react';
import AnimatedSpotSuccess from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-success-light.json';
import SpotSuccessLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-success-light.svg';

function SuccessAnimation() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return <img src={SpotSuccessLight} alt="" role="presentation" width={200} height={200} />;
  }
  return <Lottie animationData={AnimatedSpotSuccess} style={{ width: 200, height: 200 }} />;
}
```

---

## Animated spots (38)

`AnimatedSpotAccount`, `AnimatedSpotBilling`, `AnimatedSpotBoiler`, `AnimatedSpotBookAppointments`, `AnimatedSpotBroadbandSymbol`, `AnimatedSpotBundle1`, `AnimatedSpotBundle2`, `AnimatedSpotCalendar`, `AnimatedSpotCelebratory`, `AnimatedSpotDarkMode`, `AnimatedSpotEarnings`, `AnimatedSpotEmptyState1`, `AnimatedSpotEmptyState2`, `AnimatedSpotError`, `AnimatedSpotEV`, `AnimatedSpotHeart`, `AnimatedSpotHelp`, `AnimatedSpotHowToVideos`, `AnimatedSpotInnovation`, `AnimatedSpotKeepTrack`, `AnimatedSpotLeads`, `AnimatedSpotMovingHouse`, `AnimatedSpotNeighbours`, `AnimatedSpotNewLook`, `AnimatedSpotNoBroadband`, `AnimatedSpotNotification`, `AnimatedSpotPests`, `AnimatedSpotProcessCompleteCelebratory`, `AnimatedSpotProcessCompleteFunctional`, `AnimatedSpotQuoteSales`, `AnimatedSpotRecognition`, `AnimatedSpotSavings2`, `AnimatedSpotSecurity`, `AnimatedSpotSecurityCode`, `AnimatedSpotSmartMeter`, `AnimatedSpotSuccess`, `AnimatedSpotSwitch`, `AnimatedSpotWelcome`

## Animated logos (6)

`AnimatedUWLogoExtendedOffWhite`, `AnimatedUWLogoExtendedPurple`, `AnimatedUWLogoStandardOffWhite`, `AnimatedUWLogoStandardPurple`, `AnimatedUWMonoOffWhite`, `AnimatedUWMonoPurple`
