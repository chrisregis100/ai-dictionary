export function LandingManifesto() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1fr_1.2fr] lg:gap-14 lg:px-6 lg:py-24">
        <div className="space-y-3">
          <p className="font-mono text-sm text-accent">Manifeste</p>
          <h2 className="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold tracking-tight text-balance">
            Le mauvais code n&apos;a jamais coûté aussi cher.
          </h2>
        </div>
        <div className="space-y-5 text-[0.95rem] leading-7 text-pretty">
          <p className="text-foreground">
            L&apos;IA génère des milliers de lignes en quelques secondes. Mais
            chaque ligne non comprise, non relue et non testée devient une
            dette : bugs en production, révisions interminables, systèmes que
            personne n&apos;ose toucher. Plus on génère vite sans méthode, plus
            la spirale du slop s&apos;accélère.
          </p>
          <p className="text-muted-foreground">
            Le problème n&apos;est pas la vitesse, c&apos;est l&apos;absence de
            méthode. Générer sans spécifier, coder sans relire, livrer sans
            vérifier : le vibe coding produit l&apos;illusion du progrès. Les
            fondamentaux du génie logiciel — spécification, revue,
            vérification — n&apos;ont jamais été aussi rentables.
          </p>
          <p className="text-muted-foreground">
            Dev Hero inverse la spirale en boucle vertueuse : comprendre avant
            de générer, produire avec méthode et outils, pratiquer sur du réel,
            rester informé et contribuer. L&apos;ingénierie avant la génération
            de code — pour construire de meilleurs logiciels avec l&apos;IA.
          </p>
        </div>
      </div>
    </section>
  );
}
