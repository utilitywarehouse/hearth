# Illustrations (`@utilitywarehouse/hearth-svg-assets`)

188 SVG files — logos, spot illustrations, scene illustrations, mascots, and technical diagrams.

```tsx
import LogoFullPurple from '@utilitywarehouse/hearth-svg-assets/lib/logo-full-purple.svg';
import SpotSavingsLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-savings-light.svg';
import MascotBroadbandLight from '@utilitywarehouse/hearth-svg-assets/lib/mascot-broadband-light.svg';
import SceneEnergyLight from '@utilitywarehouse/hearth-svg-assets/lib/scene-energy-light.svg';
```

**Import pattern:** `@utilitywarehouse/hearth-svg-assets/lib/{kebab-case-name}.svg`

**Themes:** Most assets come in `light` and `dark` variants. Use `light` on light backgrounds, `dark` on dark backgrounds.

```tsx
// Logo — needs descriptive alt text
<img src={LogoFullPurple} alt="Utility Warehouse" />

// Decorative illustration — alt="" is correct
<img src={SpotSavingsLight} alt="" role="presentation" />

// Inside a CardBannerImage
<CardBannerImage width="160px" height="174px">
  <img src={MascotBroadbandLight} style={{ objectFit: 'cover' }} alt="" role="presentation" />
</CardBannerImage>

// Scene illustration for a service page
<img src={SceneEnergyLight} alt="" role="presentation" />
```

**Accessibility:** Logos and brand marks need descriptive `alt` text. All other illustrations (spots, scenes, mascots, technical) are decorative — use `alt=""`.

---

## Logos (4)

`LogoFullPurple`, `LogoFullWarmWhite`, `LogoCondensedPurple`, `LogoCondensedWarmWhite`

---

## Spot illustrations (76)

Small illustrations for cards, empty states, and contextual messaging. Each available in light and dark.

`SpotBookAppointmentLight`, `SpotBookAppointmentDark`, `SpotBoilerLight`, `SpotBoilerDark`, `SpotBroadbandLight`, `SpotBroadbandDark`, `SpotBillingLight`, `SpotBillingDark`, `SpotBundleCompleteLight`, `SpotBundleCompleteDark`, `SpotBundleIncompleteLight`, `SpotBundleIncompleteDark`, `SpotCalendarLight`, `SpotCalendarDark`, `SpotCelebratoryLight`, `SpotCelebratoryDark`, `SpotConfettiLight`, `SpotConfettiDark`, `SpotDarkModeLight`, `SpotDarkModeDark`, `SpotEarningsLight`, `SpotEarningsDark`, `SpotEmptyLight`, `SpotEmptyDark`, `SpotErrorLight`, `SpotErrorDark`, `SpotEvLight`, `SpotEvDark`, `SpotHeartLight`, `SpotHeartDark`, `SpotHelpLight`, `SpotHelpDark`, `SpotHowToVideoLight`, `SpotHowToVideoDark`, `SpotInnovationLight`, `SpotInnovationDark`, `SpotKeepTrackLight`, `SpotKeepTrackDark`, `SpotLeadsLight`, `SpotLeadsDark`, `SpotMovingHouseLight`, `SpotMovingHouseDark`, `SpotNeighboursLight`, `SpotNeighboursDark`, `SpotNewLookLight`, `SpotNewLookDark`, `SpotNoBroadbandLight`, `SpotNoBroadbandDark`, `SpotNotificationLight`, `SpotNotificationDark`, `SpotOnlineAccountLight`, `SpotOnlineAccountDark`, `SpotPiggyBankLight`, `SpotPiggyBankDark`, `SpotQuoteLight`, `SpotQuoteDark`, `SpotRecognitionLight`, `SpotRecognitionDark`, `SpotSecurityLight`, `SpotSecurityDark`, `SpotSecurityCodeLight`, `SpotSecurityCodeDark`, `SpotSmartMeterLight`, `SpotSmartMeterDark`, `SpotSuccessLight`, `SpotSuccessDark`, `SpotSavingsLight`, `SpotSavingsDark`, `SpotSwitchLight`, `SpotSwitchDark`, `SpotTickLight`, `SpotTickDark`, `SpotUnavailableLight`, `SpotUnavailableDark`, `SpotWelcomeLight`, `SpotWelcomeDark`

---

## Scene illustrations (12)

Full-width service scenes for page headers and marketing sections.

`SceneEnergyLight`, `SceneEnergyDark`, `SceneMobileLight`, `SceneMobileDark`, `SceneBroadbandLight`, `SceneBroadbandDark`, `SceneInsuranceLight`, `SceneInsuranceDark`, `SceneCashbackLight`, `SceneCashbackDark`, `SceneBundleLight`, `SceneBundleDark`

---

## Mascots (10)

Service-specific character illustrations.

`MascotEnergyLight`, `MascotEnergyDark`, `MascotBroadbandLight`, `MascotBroadbandDark`, `MascotMobileLight`, `MascotMobileDark`, `MascotInsuranceLight`, `MascotInsuranceDark`, `MascotCashbackLight`, `MascotCashbackDark`

---

## Technical diagrams (86)

Instructional diagrams for broadband setup, meters, locks, and property types. Each available in light and dark.

`TechnicalBuildingsAndContentsLight`, `TechnicalBuildingsAndContentsDark`, `TechnicalBuildingsLight`, `TechnicalBuildingsDark`, `TechnicalBungalowLight`, `TechnicalBungalowDark`, `TechnicalContentsLight`, `TechnicalContentsDark`, `TechnicalDslCableLight`, `TechnicalDslCableDark`, `TechnicalDslPowerMicrofilterLight`, `TechnicalDslPowerMicrofilterDark`, `TechnicalEeroLight`, `TechnicalEeroDark`, `TechnicalEthernetCableLight`, `TechnicalEthernetCableDark`, `TechnicalFlatLight`, `TechnicalFlatDark`, `TechnicalFullFibreSocketLight`, `TechnicalFullFibreSocketDark`, `TechnicalFullfibre916DesktopLight`, `TechnicalFullfibre916DesktopDark`, `TechnicalFullfibre916MobileLight`, `TechnicalFullfibre916MobileDark`, `TechnicalHouseLight`, `TechnicalHouseDark`, `TechnicalMainTelephoneSocketLight`, `TechnicalMainTelephoneSocketDark`, `TechnicalMeter01LabelledLight`, `TechnicalMeter01LabelledDark`, `TechnicalMeter02LabelledLight`, `TechnicalMeter02LabelledDark`, `TechnicalMeter02Light`, `TechnicalMeter02Dark`, `TechnicalMeterLight`, `TechnicalMeterDark`, `TechnicalMicrofilter01Light`, `TechnicalMicrofilter01Dark`, `TechnicalMicrofilter02Light`, `TechnicalMicrofilter02Dark`, `TechnicalMorticeDeadlock5LeversLight`, `TechnicalMorticeDeadlock5LeversDark`, `TechnicalMultipointSystem3BoltsLight`, `TechnicalMultipointSystem3BoltsDark`, `TechnicalOpticalNetworkTerminalLight`, `TechnicalOpticalNetworkTerminalDark`, `TechnicalOntRouterConnxLight`, `TechnicalOntRouterConnxDark`, `TechnicalOtherBuildingLight`, `TechnicalOtherBuildingDark`, `TechnicalOtherLockLight`, `TechnicalOtherLockDark`, `TechnicalPowerSupply01BRgbLight`, `TechnicalPowerSupply01BRgbDark`, `TechnicalPrefilteredConnxFullLabelledLight`, `TechnicalPrefilteredConnxFullLabelledDark`, `TechnicalPrefilteredConnxFullLight`, `TechnicalPrefilteredConnxFullDark`, `TechnicalPrefilteredConnxPartLight`, `TechnicalPrefilteredConnxPartDark`, `TechnicalPrefilteredMasterSocketsLight`, `TechnicalPrefilteredMasterSocketsDark`, `TechnicalRimAutomaticDeadlockLight`, `TechnicalRimAutomaticDeadlockDark`, `TechnicalRouter01Light`, `TechnicalRouter01Dark`, `TechnicalRouter02FrontLight`, `TechnicalRouter02FrontDark`, `TechnicalRouter03RearLight`, `TechnicalRouter03RearDark`, `TechnicalRouterStatusGreenLight`, `TechnicalRouterStatusGreenDark`, `TechnicalRouterStatusOffLight`, `TechnicalRouterStatusOffDark`, `TechnicalRouterStatusOrangeLight`, `TechnicalRouterStatusOrangeDark`, `TechnicalRouterStatusRedLight`, `TechnicalRouterStatusRedDark`, `TechnicalRouterWithPowerLight`, `TechnicalRouterWithPowerDark`, `TechnicalStandardDslConnxFullLabelledLight`, `TechnicalStandardDslConnxFullLabelledDark`, `TechnicalStandardDslConnxFullLight`, `TechnicalStandardDslConnxFullDark`, `TechnicalStandardDslConnxPartLight`, `TechnicalStandardDslConnxPartDark`
