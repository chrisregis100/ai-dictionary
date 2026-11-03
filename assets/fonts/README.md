# Polices vendorees pour les images Open Graph

Fichiers TTF **statiques** (pas de variable fonts : Satori ne gere pas bien les axes).

`google/fonts` ne publie plus que des TTF variables pour Fraunces (`ofl/fraunces`) et Outfit (`ofl/outfit`). `fonttools` / `pyftsubset` n'etait pas installe, donc les instances statiques viennent des depots amont officiels documentes par Google Fonts (`upstream_info.md`), sous licence **SIL Open Font License 1.1**.

| Fichier | Famille | Graisse | Source |
| --- | --- | --- | --- |
| `Fraunces144pt-Bold.ttf` | Fraunces (opsz 144, display) | 700 | [undercasetype/Fraunces](https://github.com/undercasetype/Fraunces) `fonts/ttf/` |
| `Outfit-Regular.ttf` | Outfit | 400 | [Outfitio/Outfit-Fonts](https://github.com/Outfitio/Outfit-Fonts) `fonts/ttf/` |
| `Outfit-SemiBold.ttf` | Outfit | 600 | [Outfitio/Outfit-Fonts](https://github.com/Outfitio/Outfit-Fonts) `fonts/ttf/` |

Telechargees via `raw.githubusercontent.com` (HTTP 200, `application/octet-stream`).

## Polices web (next/font/local)

WOFF2 variables pour `app/layout.tsx`. Le build ne telecharge plus Google Fonts : Turbopack traitait un timeout vers `fonts.gstatic.com` comme une erreur de module.

| Fichier | Famille | Axes | Source |
| --- | --- | --- | --- |
| `Fraunces-Variable.woff2` | Fraunces latin | wght, opsz, SOFT, WONK | [@fontsource-variable/fraunces@5.3.0](https://fontsource.org/fonts/fraunces) `latin-full-normal` |
| `Fraunces-Variable-Italic.woff2` | Fraunces latin italic | wght, opsz, SOFT, WONK | [@fontsource-variable/fraunces@5.3.0](https://fontsource.org/fonts/fraunces) `latin-full-italic` |
| `Outfit-Variable.woff2` | Outfit latin | wght | [@fontsource-variable/outfit@5.2.8](https://fontsource.org/fonts/outfit) `latin-wght-normal` |
