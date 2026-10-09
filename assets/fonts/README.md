# Polices vendorees pour les images Open Graph

Fichiers TTF **statiques** (pas de variable fonts : Satori ne gere pas bien les axes).

`google/fonts` ne publie plus que des TTF variables pour Fraunces (`ofl/fraunces`) et Outfit (`ofl/outfit`). `fonttools` / `pyftsubset` n'etait pas installe, donc les instances statiques viennent des depots amont officiels documentes par Google Fonts (`upstream_info.md`), sous licence **SIL Open Font License 1.1**.

| Fichier | Famille | Graisse | Source |
| --- | --- | --- | --- |
| `Fraunces144pt-Bold.ttf` | Fraunces (opsz 144, display) | 700 | [undercasetype/Fraunces](https://github.com/undercasetype/Fraunces) `fonts/ttf/` |
| `Outfit-Regular.ttf` | Outfit | 400 | [Outfitio/Outfit-Fonts](https://github.com/Outfitio/Outfit-Fonts) `fonts/ttf/` |
| `Outfit-SemiBold.ttf` | Outfit | 600 | [Outfitio/Outfit-Fonts](https://github.com/Outfitio/Outfit-Fonts) `fonts/ttf/` |

Telechargees via `raw.githubusercontent.com` (HTTP 200, `application/octet-stream`).
