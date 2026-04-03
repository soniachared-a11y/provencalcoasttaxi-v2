import SEOHead from '../seo/SEOHead'

export default function MentionsLegalesPage() {
  const s = {
    label: {
      fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 700,
      letterSpacing: '0.28em', textTransform: 'uppercase',
      color: 'var(--olive)', display: 'block', marginBottom: 8,
    },
    h2: {
      fontFamily: "'Instrument Serif', serif",
      fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
      fontWeight: 400, color: 'var(--texte)',
      margin: '0 0 16px',
      paddingBottom: 12,
      borderBottom: '1px solid var(--border)',
    },
    h3: {
      fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 600,
      color: 'var(--texte)', margin: '24px 0 8px', letterSpacing: '0.02em',
    },
    p: {
      fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 300,
      color: 'var(--texte-light)', lineHeight: 1.8, marginBottom: 12,
    },
    strong: { fontWeight: 500, color: 'var(--texte)' },
    a: { color: 'var(--olive)', textDecoration: 'none' },
    card: {
      background: '#fff', border: '1px solid var(--border)',
      padding: '24px 28px', marginBottom: 16,
    },
    cardP: {
      fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 300,
      color: 'var(--texte-light)', lineHeight: 1.7, marginBottom: 8,
    },
    num: {
      fontFamily: 'Sora, sans-serif', fontSize: 8, fontWeight: 600,
      letterSpacing: '0.14em', color: 'var(--olive)',
      display: 'block', marginBottom: 6,
    },
    section: { marginBottom: 52 },
  }

  const Section = ({ num, title, children }) => (
    <section style={s.section}>
      <h2 style={s.h2}>
        <span style={s.num}>{num}</span>
        {title}
      </h2>
      {children}
    </section>
  )

  const Card = ({ children }) => (
    <div style={s.card}>{children}</div>
  )

  const CardRow = ({ label, children }) => (
    <p style={{ ...s.cardP, marginBottom: 8 }}>
      <strong style={s.strong}>{label} </strong>{children}
    </p>
  )

  return (
    <>
      <SEOHead
        path="/mentions-legales"
        title="Mentions légales — Taxis Provençale Aix"
        description="Mentions légales, politique de confidentialité et conditions d'utilisation du site taxisprovencaleaix.fr. Taxis Provençale Aix, 82 avenue Henri Mauriat, 13100 Aix-en-Provence."
      />
      {/* Hero */}
      <div className="page-hero" style={{
        background: '#0D1117',
        padding: 'clamp(120px,14vw,160px) clamp(24px,6vw,72px) clamp(56px,6vw,80px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(107,125,74,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <span style={s.label}>Informations légales</span>
        <h1 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(2rem,5vw,3.5rem)',
          fontWeight: 400, color: 'var(--cream)',
          lineHeight: 1.1, margin: '0 auto 16px',
          maxWidth: 600, position: 'relative',
        }}>Mentions légales</h1>
        <p style={{
          fontFamily: 'Sora, sans-serif', fontSize: 13,
          color: 'rgba(246,243,238,0.45)', maxWidth: 480, margin: '0 auto',
          lineHeight: 1.8, position: 'relative',
        }}>
          Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.
        </p>
      </div>

      {/* Content */}
      <main style={{
        maxWidth: 800, margin: '0 auto',
        padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,32px) clamp(64px,8vw,120px)',
        background: 'var(--cream)',
      }}>

        <Section num="01" title="Éditeur du site">
          <Card>
            <CardRow label="Raison sociale :">Taxis Provençale Aix</CardRow>
            <CardRow label="Dirigeant / Responsable de la publication :">Yassine Ouerfelli</CardRow>
            <CardRow label="Licence VTC :">N°013230073</CardRow>
            <CardRow label="Adresse :">82 avenue Henri Mauriat, Building 14, Résidence Saint Benoit, 13100 Aix-en-Provence</CardRow>
            <CardRow label="Téléphone :">
              <a href="tel:+33615963275" style={s.a}>06 15 96 32 75</a>
            </CardRow>
            <CardRow label="Email :">
              <a href="mailto:provencalcoastdriver@gmail.com" style={s.a}>provencalcoastdriver@gmail.com</a>
            </CardRow>
          </Card>
        </Section>

        <Section num="02" title="Hébergement">
          <Card>
            <CardRow label="Hébergeur :">Vercel Inc.</CardRow>
            <CardRow label="Adresse :">440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</CardRow>
            <CardRow label="Site web :">
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={s.a}>vercel.com</a>
            </CardRow>
          </Card>
        </Section>

        <Section num="03" title="Activité réglementée">
          <p style={s.p}>L'activité de Voiture de Transport avec Chauffeur (VTC) est réglementée par le Code des transports, notamment les articles L.3120-1 et suivants. Le chauffeur est titulaire d'une carte professionnelle VTC délivrée par la préfecture compétente.</p>
          <Card>
            <CardRow label="Licence VTC :">N°013230073</CardRow>
            <CardRow label="Inscription :">Registre des VTC tenu par le ministère chargé des transports</CardRow>
          </Card>
        </Section>

        <Section num="04" title="Propriété intellectuelle">
          <p style={s.p}>L'ensemble des éléments constituant le site taxisprovencaleaix.fr — textes, images, logos, graphismes, icônes, vidéos, mise en page — est protégé par les lois en vigueur relatives à la propriété intellectuelle.</p>
          <p style={s.p}>Toute reproduction, représentation, modification ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Taxis Provençale Aix.</p>
          <p style={s.p}>Toute exploitation non autorisée sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux articles L.335-2 et suivants du Code de la propriété intellectuelle.</p>
        </Section>

        <Section num="05" title="Protection des données personnelles">
          <h3 style={s.h3}>Responsable du traitement</h3>
          <p style={s.p}>Le responsable du traitement des données à caractère personnel est Yassine Ouerfelli, joignable à l'adresse <a href="mailto:provencalcoastdriver@gmail.com" style={s.a}>provencalcoastdriver@gmail.com</a>.</p>

          <h3 style={s.h3}>Données collectées</h3>
          <p style={s.p}>Dans le cadre de son activité, Taxis Provençale Aix est amenée à collecter les données suivantes : nom, prénom, adresse email, numéro de téléphone, adresse de prise en charge et de destination, ainsi que toute information nécessaire à la réalisation d'une prestation de transport.</p>

          <h3 style={s.h3}>Finalités du traitement</h3>
          <p style={s.p}>Les données collectées sont utilisées pour la gestion des réservations, l'exécution des prestations de transport, la facturation, la communication avec les clients et l'amélioration des services proposés.</p>

          <h3 style={s.h3}>Base légale</h3>
          <p style={s.p}>Le traitement des données repose sur l'exécution du contrat de transport (article 6.1.b du RGPD) et, le cas échéant, sur le consentement de l'utilisateur (article 6.1.a du RGPD).</p>

          <h3 style={s.h3}>Durée de conservation</h3>
          <p style={s.p}>Les données personnelles sont conservées pendant la durée strictement nécessaire à la réalisation des finalités mentionnées ci-dessus, et au maximum pendant 3 ans à compter du dernier contact avec le client, sauf obligation légale de conservation plus longue.</p>

          <h3 style={s.h3}>Vos droits</h3>
          <p style={s.p}>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité des données et d'opposition. Pour exercer ces droits, adressez un email à <a href="mailto:provencalcoastdriver@gmail.com" style={s.a}>provencalcoastdriver@gmail.com</a>.</p>
          <p style={s.p}>En cas de litige, vous pouvez introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={s.a}>CNIL</a>.</p>

          <h3 style={s.h3}>Transfert de données</h3>
          <p style={s.p}>Les données peuvent être hébergées en dehors de l'Union européenne via les services d'hébergement (Vercel). Ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne.</p>
        </Section>

        <Section num="06" title="Cookies">
          <h3 style={s.h3}>Cookies strictement nécessaires</h3>
          <p style={s.p}>Indispensables au fonctionnement du site, ils ne nécessitent pas votre consentement.</p>

          <h3 style={s.h3}>Cookies de mesure d'audience</h3>
          <p style={s.p}>Utilisés pour analyser la fréquentation du site et améliorer son contenu. Ces cookies sont soumis à votre consentement.</p>

          <h3 style={s.h3}>Gestion des cookies</h3>
          <p style={s.p}>Vous pouvez modifier vos préférences en matière de cookies via les paramètres de votre navigateur. Le refus des cookies peut limiter l'accès à certaines fonctionnalités du site.</p>
        </Section>

        <Section num="07" title="Limitation de responsabilité">
          <p style={s.p}>Les informations diffusées sur le site taxisprovencaleaix.fr sont fournies à titre indicatif et ne sauraient engager la responsabilité de l'éditeur. Malgré les efforts pour maintenir les informations à jour, Taxis Provençale Aix ne peut garantir leur exactitude ou leur complétude.</p>
          <p style={s.p}>L'éditeur ne saurait être tenu responsable des dommages directs ou indirects résultant de l'accès ou de l'utilisation du site, y compris l'inaccessibilité, les pertes de données ou les dommages pouvant affecter votre équipement informatique.</p>
        </Section>

        <Section num="08" title="Liens hypertextes">
          <p style={s.p}>Le site peut contenir des liens vers d'autres sites internet. Taxis Provençale Aix n'exerce aucun contrôle sur le contenu de ces sites tiers et décline toute responsabilité quant à leur contenu ou aux dommages pouvant résulter de leur utilisation.</p>
        </Section>

        <Section num="09" title="Droit applicable">
          <p style={s.p}>Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut de résolution amiable, les tribunaux compétents d'Aix-en-Provence seront seuls compétents.</p>
        </Section>

        <Section num="10" title="Mise à jour">
          <p style={s.p}>Les présentes mentions légales peuvent être modifiées à tout moment. <strong style={s.strong}>Dernière mise à jour : Avril 2026.</strong></p>
        </Section>

      </main>
    </>
  )
}
