# Icons (`@utilitywarehouse/hearth-react-icons`)

189 icons as React SVG components.

```tsx
import { AddMediumIcon, ChevronRightSmallIcon, TrashSmallIcon } from '@utilitywarehouse/hearth-react-icons';
```

**Naming convention:** `{Name}{Size}Icon`

| Size suffix | Visual size | Use case |
|---|---|---|
| `Small` | 24px | Tight UI, inline with small text, trailing chevrons |
| `Medium` | 32px | Standard buttons, navigation, most UI contexts |
| `Large` | 48px | Hero icons, empty states, feature highlights |

```tsx
// Standalone icon — provide title for accessibility
<InfoMediumIcon title="More information" titleId="more-info" />

// Icon inside a labelled button — no title needed
<Button variant="solid">
  <AddMediumIcon />
  Add item
</Button>

// Icon-only button — use IconButton, not a bare icon
<IconButton label="Delete" variant="ghost" colorScheme="functional">
  <TrashSmallIcon />
</IconButton>

// Purely decorative
<ElectricityMediumIcon aria-hidden="true" />
```

**Accessibility:**
- **Standalone** (no surrounding label): provide `title` and `titleId`
- **Inside a labelled button/link**: omit `title` — the surrounding label provides the name
- **Purely decorative**: `aria-hidden="true"`

**IconContainer:** see [`components/IconContainer.md`](components/IconContainer.md) for coloured icon containers used in cards and lists.

---

## All 189 icons

AddMediumIcon, AddSmallIcon, AttachMediumIcon, AttachSmallIcon, BankMediumIcon, BasketMediumIcon, BasketSmallIcon, BellMediumIcon, BellSmallIcon, BillMediumIcon, BillSmallIcon, BoilerMediumIcon, BookmarkMediumIcon, BookOpenLargeIcon, BookOpenMediumIcon, BroadbandMediumIcon, BroadbandSmallIcon, BulbMediumIcon, CalendarAddMediumIcon, CalendarAddSmallIcon, CalendarMediumIcon, CalendarSmallIcon, CameraMediumIcon, CashbackCardMediumIcon, CashbackCardSmallIcon, CelebrationMediumIcon, CelebrationSmallIcon, ChevronDownMediumIcon, ChevronDownSmallIcon, ChevronLeftMediumIcon, ChevronLeftSmallIcon, ChevronRightMediumIcon, ChevronRightSmallIcon, ChevronUpMediumIcon, ChevronUpSmallIcon, CloseMediumIcon, CloseSmallIcon, ContactlessMediumIcon, CopyMediumIcon, CopySmallIcon, CreditMediumIcon, CreditReversalMediumIcon, CreditReversalSmallIcon, CreditsAndDebitsMediumIcon, CreditSmallIcon, DecreaseMediumIcon, DecreaseSmallIcon, DocumentMediumIcon, DownloadMediumIcon, DownloadSmallIcon, EditMediumIcon, EditSmallIcon, ElectricityMediumIcon, ElectricitySmallIcon, EmailMediumIcon, EmailSmallIcon, EnvironmentMediumIcon, ErrorCircleSmallIcon, ExpandMediumIcon, ExpandSmallIcon, ExtraHelpMediumIcon, EyeMediumIcon, EyeOffMediumIcon, EyeOffSmallIcon, EyeSmallIcon, FacebookMediumIcon, FilterMediumIcon, FilterSmallIcon, FingerprintMediumIcon, FitEnergyMediumIcon, FullscreenMediumIcon, FullscreenSmallIcon, GasMediumIcon, GasSmallIcon, GreenDealElectricityMediumIcon, HeartMediumIcon, HeartOutlineMediumIcon, HeartSmallIcon, HistoryMediumIcon, HomeAndBoilerMediumIcon, HomeAndBoilerSmallIcon, HomeInsuranceMediumIcon, HomeInsuranceSmallIcon, HomeMediumIcon, IncomeProtectMediumIcon, IncomeProtectSmallIcon, IncreaseMediumIcon, IncreaseSmallIcon, InfoMediumIcon, InfoSmallIcon, InsightsMediumIcon, InsightsSmallIcon, InstagramMediumIcon, InsuranceMediumIcon, InsuranceSmallIcon, LandlineMediumIcon, LandlineSmallIcon, LaunchMediumIcon, LaunchSmallIcon, LinkedInMediumIcon, LinkMediumIcon, LinkSmallIcon, ListSmallIcon, LocateSmallIcon, LocationMediumIcon, LocationSmallIcon, LockMediumIcon, LockSmallIcon, LoginMediumIcon, LoginSmallIcon, LogoutMediumIcon, LogoutSmallIcon, MaintenanceMediumIcon, MenuMediumIcon, MeterMediumIcon, MeterSmallIcon, MinusMediumIcon, MinusSmallIcon, MobileMediumIcon, MobileSmallIcon, MoneyMediumIcon, MoonLargeIcon, MoonMediumIcon, MoreMediumIcon, MoreSmallIcon, OpenMediumIcon, OpenSmallIcon, PaymentMediumIcon, PhoneMediumIcon, PhoneSmallIcon, PlaceholderLargeIcon, PlaceholderMediumIcon, PlaceholderSmallIcon, PlayMediumIcon, PlaySmallIcon, QuestionMarkMediumIcon, QuestionMarkSmallIcon, RefundMediumIcon, RefundSmallIcon, RestartMediumIcon, SearchMediumIcon, SearchSmallIcon, SendMediumIcon, SendSmallIcon, SettingsMediumIcon, SettingsSmallIcon, ShareMediumIcon, ShareSmallIcon, ShoppingMediumIcon, ShoppingSmallIcon, SimMediumIcon, SimSmallIcon, SkipFirstSmallIcon, SkipLastSmallIcon, SnowflakeMediumIcon, SnowflakeSmallIcon, SunLargeIcon, SunMediumIcon, TeamMediumIcon, ThumbsDownSmallIcon, ThumbsUpSmallIcon, TickCircleMediumIcon, TickCircleSmallIcon, TickMediumIcon, TickSmallIcon, TikTokMediumIcon, TimeMediumIcon, TimeSmallIcon, TopUpMediumIcon, TopUpSmallIcon, TorchOffMediumIcon, TorchOnMediumIcon, TransferMediumIcon, TrashMediumIcon, TrashSmallIcon, TwitterMediumIcon, UnlockMediumIcon, UnlockSmallIcon, UploadMediumIcon, UploadSmallIcon, UserMediumIcon, UserSmallIcon, WarningMediumIcon, WarningSmallIcon, WhatsAppMediumIcon, WhatsAppSmallIcon, WithdrawMediumIcon, WithdrawSmallIcon, YoutubeMediumIcon
