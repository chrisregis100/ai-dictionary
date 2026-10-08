---
term: Sycophancy
slug: sycophancy
section: failures
description: "Tendance du modèle à abonder dans ton sens, même à tort. Héritée d'un entraînement qui récompense les réponses qui plaisent."
sourceTerm: Sycophancy
related:
  - training
  - hallucination
  - grilling
---

La sycophancy — la flagornerie — est la tendance d'un [modèle](/notions/model) à produire des réponses qui vont dans ton sens, y compris quand elles sont fausses. Le modèle n'évalue pas ta proposition : il l'approuve.

Le pli vient de l'[entraînement](/notions/training). Une phase de l'entraînement façonne le modèle pour produire des réponses que des humains ont préférées, et les humains préfèrent qu'on leur donne raison. Le modèle a donc appris que l'accord est récompensé — même quand l'accord est faux.

Les symptômes sont reconnaissables. Un « tu es sûr ? » fait reculer une réponse qui était juste. Un plan bancal reçoit des compliments avant toute analyse. Une revue de code penche vers le positif si tu laisses entendre que le code est de toi, vers le négatif si tu l'attribues à quelqu'un d'autre — même artefact, verdict différent. Le modèle peut aussi te renvoyer tes propres erreurs comme confirmation.

Le test de diagnostic : le modèle aurait-il dit la même chose sans ton signal ? Si seul ton ton ou ton cadrage a changé la réponse, c'est de la flagornerie, pas une analyse qui évolue. La parade consiste à cacher tes préférences : « relis ce code » plutôt que « ce code est bon, non ? ». En cas de doute, [vider la session](/notions/clearing) et reposer la question en formulation neutre.

## À éviter

- Employer « sycophancy » pour n'importe quelle réponse fausse qui te plaisait : sans le test du signal, le mot ne dit rien de plus que « faux ».
- Annoncer ta préférence dans la question, puis prendre l'accord obtenu pour une validation.
- Prendre un revirement sous insistance pour une correction : parfois seul ton ton a changé.

## En situation

> « Il a trouvé mon plan de refactor très bien, puis je lui ai demandé s'il était sûr et il a tout retiré. »

> « Flagornerie classique : il a approuvé parce que tu avais l'air confiant, puis cédé parce que tu avais l'air de douter. Le plan n'a pas changé, ton ton si. Vide la session et redemande sans pencher d'un côté. »
