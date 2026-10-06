# Position

The position props are responsive, and accept [space design tokens](https://hearth.prod.uw.systems/?path=/docs/tokens_space--docs#available-space-tokens),
as well as raw string values.

```tsx
<Box position="relative" />
<Box position={{ mobile: "relative", desktop: "sticky"}} />
// Space tokens
<Box position="absolute" inset="400" bottom="100" />
// Raw strings & space tokens
<Box position="absolute" bottom={{mobile: '25%', desktop: '200'}}/>
```

| Prop       | Type                                                                                                                                                                                    | Default    | Description                                                                                                        |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `position` | `Responsive<"fixed" \| "static" \| "relative" \| "absolute" \| "sticky">`                                                                                                               | `'static'` | Set how the component is positioned in the document.                                                               |
| `inset`    | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>` | —          | Set the distance of all four edges (top, right, bottom, left) of a positioned component from its containing block. |
| `top`      | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>` | —          | Set the distance of the top edge of a positioned component from its containing block.                              |
| `right`    | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>` | —          | Set the distance of the right edge of a positioned component from its containing block.                            |
| `bottom`   | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>` | —          | Set the distance of the bottom edge of a positioned component from its containing block.                           |
| `left`     | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>` | —          | Set the distance of the left edge of a positioned component from its containing block.                             |
