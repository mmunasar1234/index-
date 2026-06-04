# Martiqaad Aroos — Wedding Invite (Full)

## Bilow
Fur **`start.html`** — waa xarunta dhammaan.

## Faylasha

| Fayl | Waxa uu qabto |
|------|----------------|
| `start.html` | Hub — dhammaan links |
| `edit.html` | Admin — beddel wax walba |
| `index.html` | Martiqaad Classic |
| `naqsho2.html` | Martiqaad Jardiino |
| `naqsho3.html` | Martiqaad Habeen |
| `qr.html` | Barcode wadaag |
| `wedding-base.js` | Config asalka (hal meel) |
| `config-*.js` | Muusig per naqshad |
| `edit.html` + `wedding-editor.js` | Form buuxa |
| `config-loader.js` | Soo rar kaydinta browser |
| `wedding-store.js` | Muusig IndexedDB |
| `app.js` | Muusig, countdown, qoraal |

## 3 tallaabo

1. **`edit.html`** — geli magacyo, qoraal, sawirro, goobta, muusig → **Kaydi**
2. Fur **`index.html`** / naqsho2 / naqsho3 — eeg natiijada
3. **`qr.html`** — barcode daabac / wadaag

## Kaydin
- Browser-kaaga: localStorage + IndexedDB
- Isla kombuyuutar + browser isticmaal markaad tijaabiso
- Backup: **Soo daji dhammaan** JSON edit.html

## Internet (dadka u dir)
```bash
cd wedding
npx serve .
```
Kadib wadaag link: `https://your-site.com/index.html`

## Config gacanta (ikhtiyaari)
Beddel `wedding-base.js` kadibna kaydi browser ama isticmaal edit.html.
