import { ArrowRight, Check, Share2, ShoppingBag, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  const handleStartSelling = () => {
    navigate("/sell");
  };

  const handleDiscover = () => {
    navigate("/feed");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main>
        {/* Hero */}
        <section className="overflow-hidden">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="max-w-xl">
              <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-primary">
                Pour les vendeurs en ligne
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
                Transforme l'intérêt de tes clients en commandes.
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
                Publie tes produits sur Maka, partage-les avec ton audience et
                laisse tes clients commander simplement.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleStartSelling}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Commencer à vendre
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleDiscover}
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-6 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Découvrir Maka
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-3 text-sm text-gray-500 sm:flex-row sm:items-center sm:gap-5">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-success" />
                  Simple à mettre en place
                </span>

                <span className="flex items-center gap-2">
                  <Check size={16} className="text-success" />
                  Pensé pour vendre
                </span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="overflow-hidden rounded-2xl border border-border bg-background p-3 shadow-md">
                <div className="overflow-hidden rounded-xl bg-white">
                  <div className="aspect-[4/3] bg-gray-100">
                    <img
                      src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1000&q=80"
                      alt="Produit présenté sur Maka"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-gray-900">
                          Robe élégante
                        </p>

                        <p className="mt-1 text-xl font-bold text-gray-900">
                          15 000 FCFA
                        </p>
                      </div>

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                        Disponible
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                        BN
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Boutique Nova
                        </p>

                        <p className="text-xs text-gray-500">@boutiquenova</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleDiscover}
                      className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white"
                    >
                      <ShoppingBag size={18} />
                      Commander
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-gray-100 bg-background">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-primary">
                COMMENT ÇA MARCHE
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                De ton produit à la commande en quelques étapes.
              </h2>

              <p className="mt-4 text-base leading-6 text-gray-600">
                Maka réduit le chemin entre ce que tu publies et ce que ton
                client veut acheter.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  number: "01",
                  icon: Store,
                  title: "Publie",
                  description:
                    "Ajoute ton produit avec une photo, un nom et un prix.",
                },
                {
                  number: "02",
                  icon: Share2,
                  title: "Partage",
                  description:
                    "Partage directement ton produit avec ton audience.",
                },
                {
                  number: "03",
                  icon: ShoppingBag,
                  title: "Vends",
                  description:
                    "Tes clients découvrent le produit et passent commande.",
                },
              ].map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="rounded-xl border border-border bg-white p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-primary">
                        <Icon size={20} />
                      </div>

                      <span className="text-sm font-semibold text-gray-300">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TikTok section */}
        <section>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-medium text-gray-500">
                      TON CONTENU
                    </p>

                    <p className="mt-2 text-sm font-medium text-gray-900">
                      Vidéo TikTok → Produit Maka
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight size={22} className="rotate-90 text-primary" />
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-medium text-gray-500">
                      TON LIEN
                    </p>

                    <p className="mt-2 truncate text-sm font-medium text-primary">
                      maka.tg/p/robe-elegante
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight size={22} className="rotate-90 text-primary" />
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-medium text-gray-500">
                      TON CLIENT
                    </p>

                    <p className="mt-2 text-sm font-medium text-gray-900">
                      Découvre → commande
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 max-w-xl lg:order-2">
              <p className="text-sm font-semibold text-primary">
                VENDS DEPUIS TON AUDIENCE
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Continue à vendre sur TikTok. Maka transforme l'intérêt en
                commandes.
              </h2>

              <p className="mt-5 text-base leading-7 text-gray-600">
                Tu as déjà une audience et tu publies déjà tes produits. Maka
                ajoute simplement le chemin qui manque entre la découverte du
                produit et la commande.
              </p>

              <button
                type="button"
                onClick={handleStartSelling}
                className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Mettre mon premier produit en vente
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* Customer experience */}
        <section className="border-y border-gray-100 bg-background">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-primary">
                POUR TES CLIENTS
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Une expérience simple pour acheter.
              </h2>

              <p className="mt-4 text-base leading-6 text-gray-600">
                Pas besoin de compliquer le parcours. Le client découvre,
                vérifie et commande.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-4xl">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Découvrir",
                    text: "Le produit est présenté clairement.",
                  },
                  {
                    title: "Faire confiance",
                    text: "Le prix, le vendeur et la disponibilité sont visibles.",
                  },
                  {
                    title: "Commander",
                    text: "Le client renseigne seulement les informations nécessaires.",
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border bg-white p-6 text-center"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-primary">
                      {index + 1}
                    </div>

                    <h3 className="mt-5 text-base font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Prêt à mettre ton premier produit en vente ?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600">
              Crée ton espace, ajoute ton premier produit et commence à
              transformer ton audience en commandes.
            </p>

            <button
              type="button"
              onClick={handleStartSelling}
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 text-base font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Commencer à vendre
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span className="font-semibold text-gray-900">Maka</span>

          <span>
            Vendre → Observer → Comprendre → Améliorer → Vendre davantage.
          </span>
        </div>
      </footer>
    </div>
  );
}
