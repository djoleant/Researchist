# Plan rada

## Frontend

- Glavna strana za pretraživanje
- Profil osobe
  - Lista radova
  - Kategorije na kojima je radio/la
  - Co-authors (?)
  - Proceedings u kojima je ta osoba
  - Edit person (institucija, kontakt, ime i prezime)

- Proceedings
  - Osobe koje su tu
  - Radovi koji su tu
  - Prikaz recenzenata

- Kategorija
  - Svi radovi iz kategorije
  - Sve osobe koje rade u toj kategoriji

- Paper
  - Autori
  - Opis
  - Reference
  - Kantica za brisanje rada
  - Prikaz recenzenata
  - Edit paper opcija (opis, naslov)

- Create paper stranica
  - izbor kategorije
  - izbor autora
  - izbor referenci
  - izbor proceedinga
  - izbor recenzenata

- Kreiranje profila (?)
  - samo unos osnovnih info

## Backend (MEĐ)

### Arhitektura

![](./Arhitektura%20backend-a.jpg)

### Funkcije kontrolera

1. Pretrazivanje cvorova po stringu (vraca i osobe i radova) (Matija)
2. Vraca info o osobi na osnovu ID (Ema)
3. Vraca radove jedne osobe na osnovu ID osobe (Djole)

4. Vraca kategorije jedne osobe na osnovu ID osobe
5. Vraca ko-autore jedne osobe na osnovu ID osobe (?)
6. Vraca proceeding-e jedne osobe na osnovu ID osobe

7. Menja ime, prezime i kontakt na osnovu ID osobe
8. Osobe na proceeding-u na osnovu ID proceedinga
9. Radovi na proceeding-u na osnovu ID proceedinga

10. Svi radovi iz kategorije na osnovu ID kategorije
11. Sve osobe iz kategorije na osnovu ID kategorije
12. Osnovne info o radu (opis, datum naslov)

13. Svi autori rada na osnovu ID rada
14. Sve reference rada ma osnovu ID rada
15. Brisanje rada po ID

16. Izmena opisa i naslova rada na osnovu ID rada
17. Kreiranje novog rada
18. Vraca sve kategorija

19. Vraca sve autore
20. Vraca sve proceeding-e na osnovu ID kategorije
21. Kreiranje nove osobe na osnovu imena, prezimena, kontakte, uloge...

22. Vraca recenzente rada na osnovu ID rada
23. Vraca recenzente na proceeding-u na osnovu ID proceeding-a
