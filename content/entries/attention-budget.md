---
term: Attention budget
slug: attention-budget
section: failures
description: "Influence finie que chaque token répartit sur le reste du contexte. Fixe par token : plus de contexte, moins de part pour chacun."
sourceTerm: Attention budget
related:
  - attention-relationship
  - attention-degradation
  - context-window
  - clearing
---

L'attention budget — le budget d'attention — est la quantité finie d'influence que chaque [token](/notions/token) répartit sur le reste du [contexte](/notions/context). Peser lourd sur une [relation](/notions/attention-relationship) laisse moins pour les autres. Le budget est par token et ne grandit pas quand le contexte grandit : c'est pour ça que les longues [sessions](/notions/session) se diluent.

Le mécanisme se décrit en signal et bruit. Ton instruction est un signal à volume fixe ; tous les autres tokens de la [fenêtre](/notions/context-window) sont du son concurrent. L'instruction ne baisse jamais — elle est toujours là, caractère pour caractère — mais à mesure que le contexte grossit, la pièce devient plus bruyante autour, et le rapport signal sur bruit chute. Une instruction qui dominait à 10 000 tokens de contexte n'est plus qu'un fond sonore à 150 000. C'est le mécanisme derrière la [dégradation de l'attention](/notions/attention-degradation) : le modèle n'oublie pas, le signal se perd dans le bruit.

Le symptôme se lit comme de la désobéissance. L'agent a accepté une contrainte tôt dans la session, puis s'en écarte, et recoller la contrainte n'aide qu'un moment. La cause n'est pas l'instruction : c'est tout le reste de la fenêtre qui lui fait concurrence.

Ce que tu contrôles, c'est ce qui entre dans le contexte. Un contenu qui ne sert pas la tâche n'est pas neutre : c'est du bruit par-dessus tout ce qui la sert. Garde la fenêtre petite, [vide](/notions/clearing) quand le contexte accumulé ne paie plus, et répète les contraintes qui comptent au lieu de faire confiance à leur mention de départ.

## À éviter

- Dire que le modèle « a oublié » l'instruction : elle est toujours dans la fenêtre, elle a perdu la compétition.
- Charger du contenu « au cas où » en le croyant gratuit : tout token présent fait du bruit sur les autres.

## En situation

> « Pourquoi il ignore le schéma que j'ai collé tout en haut ? »

> « On est loin dans la zone bête : le budget d'attention de chaque token est fixe, mais le contexte n'a pas arrêté de grossir. Le signal du schéma concourt maintenant avec des milliers de tokens plus récents. »
