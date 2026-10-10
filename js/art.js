(function () {
  function plate(content) {
    return (
      '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">' +
      '<rect width="400" height="300" fill="#171b20"/>' +
      '<circle cx="200" cy="148" r="118" fill="#21272e"/>' +
      '<path d="M40 252h320" stroke="#ff6a1a" stroke-opacity=".4" stroke-width="2"/>' +
      content +
      "</svg>"
    );
  }

  const arts = {
    candela: plate(
      '<rect x="176" y="48" width="48" height="78" rx="6" fill="#f4f1ea"/>' +
        '<rect x="188" y="34" width="24" height="20" rx="3" fill="#d9d3c7"/>' +
        '<path d="M158 126h84l16 28-16 28h-84l-16-28z" fill="#d5dbe1" stroke="#8e99a4"/>' +
        '<rect x="184" y="182" width="32" height="70" fill="#9aa3ad"/>' +
        '<path d="M184 196h32M184 210h32M184 224h32M184 238h32" stroke="#66707a"/>' +
        '<rect x="194" y="250" width="12" height="16" fill="#4d565f"/>'
    ),
    filtro: plate(
      '<ellipse cx="200" cy="150" rx="92" ry="62" fill="#2b2418" stroke="#c9a36a" stroke-width="8"/>' +
        '<ellipse cx="200" cy="150" rx="62" ry="38" fill="#3a3122"/>' +
        '<path d="M150 150h100M200 112v76M168 126c20 16 44 16 64 0M168 174c20-16 44-16 64 0" stroke="#e2b15a" stroke-opacity=".7"/>' +
        '<rect x="286" y="132" width="28" height="36" rx="4" fill="#8e99a4"/>'
    ),
    cilindro: plate(
      '<rect x="150" y="58" width="100" height="22" rx="3" fill="#b7c0c8"/>' +
        '<rect x="138" y="84" width="124" height="16" fill="#d5dbe1"/>' +
        '<rect x="146" y="104" width="108" height="14" fill="#9aa3ad"/>' +
        '<rect x="138" y="122" width="124" height="16" fill="#d5dbe1"/>' +
        '<rect x="146" y="142" width="108" height="14" fill="#9aa3ad"/>' +
        '<rect x="138" y="160" width="124" height="16" fill="#d5dbe1"/>' +
        '<rect x="160" y="180" width="80" height="62" fill="#8e99a4"/>' +
        '<rect x="176" y="196" width="48" height="28" fill="#171b20"/>' +
        '<circle cx="200" cy="210" r="8" fill="#ff6a1a"/>'
    ),
    carburatore: plate(
      '<rect x="118" y="118" width="150" height="46" rx="8" fill="#c5ccd3"/>' +
        '<circle cx="168" cy="141" r="16" fill="#171b20"/>' +
        '<rect x="250" y="126" width="54" height="30" rx="4" fill="#8e99a4"/>' +
        '<rect x="156" y="164" width="78" height="58" rx="10" fill="#d5dbe1" stroke="#8e99a4"/>' +
        '<rect x="196" y="78" width="14" height="46" fill="#9aa3ad"/>' +
        '<circle cx="203" cy="74" r="10" fill="#ff6a1a"/>' +
        '<path d="M118 132h-28" stroke="#5c656e" stroke-width="8" stroke-linecap="round"/>'
    ),
    cinghia: plate(
      '<path d="M96 92h150l70 116H166L96 92z" fill="none" stroke="#1b1e22" stroke-width="28"/>' +
        '<path d="M96 92h150l70 116H166L96 92z" fill="none" stroke="#f4f1ea" stroke-width="16"/>' +
        '<path d="M112 104h128M130 128h128M148 152h128M166 176h120" stroke="#171b20" stroke-width="3"/>' +
        '<circle cx="118" cy="196" r="10" fill="#ff6a1a"/>'
    ),
    rulli: plate(
      '<g fill="#e2b15a" stroke="#8a6a2a">' +
        '<rect x="78" y="118" width="70" height="64" rx="32"/>' +
        '<rect x="166" y="118" width="70" height="64" rx="32"/>' +
        '<rect x="254" y="118" width="70" height="64" rx="32"/>' +
        "</g>" +
        '<path d="M90 150h46M178 150h46M266 150h46" stroke="#8a6a2a"/>' +
        '<text x="200" y="230" text-anchor="middle" fill="#f4f1ea" font-family="Arial,sans-serif" font-size="16">6,5 g</text>'
    ),
    frizione: plate(
      '<circle cx="200" cy="146" r="78" fill="#2a3138" stroke="#d5dbe1" stroke-width="8"/>' +
        '<circle cx="200" cy="146" r="28" fill="#ff6a1a"/>' +
        '<path d="M200 78v28M200 186v28M132 146H104M296 146h-28" stroke="#c5ccd3" stroke-width="10" stroke-linecap="round"/>' +
        '<circle cx="200" cy="86" r="14" fill="#9aa3ad"/>' +
        '<circle cx="148" cy="190" r="14" fill="#9aa3ad"/>' +
        '<circle cx="252" cy="190" r="14" fill="#9aa3ad"/>'
    ),
    pastiglie: plate(
      '<rect x="96" y="108" width="86" height="92" rx="10" fill="#c5ccd3"/>' +
        '<rect x="108" y="120" width="62" height="68" rx="6" fill="#2a241c"/>' +
        '<rect x="218" y="108" width="86" height="92" rx="10" fill="#c5ccd3"/>' +
        '<rect x="230" y="120" width="62" height="68" rx="6" fill="#2a241c"/>' +
        '<path d="M126 132h28M248 132h28" stroke="#ff6a1a" stroke-width="4"/>'
    ),
    disco: plate(
      '<circle cx="200" cy="148" r="90" fill="#8e99a4" stroke="#d5dbe1" stroke-width="10"/>' +
        '<circle cx="200" cy="148" r="28" fill="#171b20" stroke="#ff6a1a" stroke-width="6"/>' +
        '<g fill="#171b20">' +
        '<circle cx="200" cy="78" r="8"/><circle cx="250" cy="96" r="8"/><circle cx="274" cy="146" r="8"/>' +
        '<circle cx="250" cy="198" r="8"/><circle cx="200" cy="218" r="8"/><circle cx="150" cy="198" r="8"/>' +
        '<circle cx="126" cy="146" r="8"/><circle cx="150" cy="96" r="8"/>' +
        "</g>"
    ),
    specchio: plate(
      '<path d="M210 230 C200 170 188 130 150 92" stroke="#9aa3ad" stroke-width="10" fill="none" stroke-linecap="round"/>' +
        '<ellipse cx="168" cy="86" rx="62" ry="40" fill="#d5dbe1" stroke="#8e99a4" stroke-width="4"/>' +
        '<ellipse cx="156" cy="78" rx="28" ry="16" fill="#f4f1ea" opacity=".8"/>' +
        '<circle cx="214" cy="230" r="10" fill="#ff6a1a"/>'
    ),
    frecce: plate(
      '<g>' +
        '<rect x="70" y="118" width="110" height="36" rx="18" fill="#ff6a1a"/>' +
        '<path d="M168 108l42 28-42 28v-18H70v-20h98v-18z" fill="#ffb088"/>' +
        '<rect x="220" y="168" width="110" height="36" rx="18" fill="#ff6a1a"/>' +
        '<path d="M232 158l-42 28 42 28v-18h110v-20H232v-18z" fill="#ffb088"/>' +
        "</g>"
    ),
    gomma: plate(
      '<circle cx="200" cy="148" r="96" fill="#14171b" stroke="#2e343b" stroke-width="16"/>' +
        '<circle cx="200" cy="148" r="62" fill="none" stroke="#d5dbe1" stroke-width="12"/>' +
        '<circle cx="200" cy="148" r="16" fill="#ff6a1a"/>' +
        '<path d="M120 80c30 20 40 20 70 0M250 210c-30-16-40-16-74 0" stroke="#5c656e" stroke-width="4"/>' +
        '<text x="200" y="154" text-anchor="middle" fill="#f4f1ea" font-family="Arial,sans-serif" font-size="18">120</text>'
    ),
    "gomma-larga": plate(
      '<circle cx="200" cy="148" r="102" fill="#14171b" stroke="#2e343b" stroke-width="22"/>' +
        '<circle cx="200" cy="148" r="58" fill="none" stroke="#d5dbe1" stroke-width="12"/>' +
        '<circle cx="200" cy="148" r="16" fill="#ff6a1a"/>' +
        '<text x="200" y="154" text-anchor="middle" fill="#f4f1ea" font-family="Arial,sans-serif" font-size="18">130</text>'
    ),
    batteria: plate(
      '<rect x="118" y="78" width="164" height="150" rx="8" fill="#1f6b4a" stroke="#9dce62" stroke-width="4"/>' +
        '<rect x="168" y="58" width="22" height="24" fill="#d5dbe1"/>' +
        '<rect x="214" y="62" width="16" height="20" fill="#9aa3ad"/>' +
        '<rect x="138" y="108" width="124" height="46" rx="4" fill="#f4f1ea"/>' +
        '<text x="200" y="140" text-anchor="middle" fill="#171b20" font-family="Arial Black,Arial,sans-serif" font-size="22">12V</text>' +
        '<text x="200" y="196" text-anchor="middle" fill="#f4f1ea" font-family="Arial,sans-serif" font-size="16">5Ah</text>'
    ),
    olio: plate(
      '<path d="M170 70h60l18 28v130a16 16 0 0 1-16 16H168a16 16 0 0 1-16-16V98z" fill="#e2b15a"/>' +
        '<rect x="176" y="48" width="48" height="28" rx="4" fill="#8e99a4"/>' +
        '<rect x="154" y="128" width="92" height="48" fill="#171b20"/>' +
        '<text x="200" y="158" text-anchor="middle" fill="#f5c542" font-family="Arial Black,Arial,sans-serif" font-size="20">2T</text>'
    ),
    kit: plate(
      '<path d="M70 118l130-40 130 40-130 40z" fill="#c5ccd3"/>' +
        '<path d="M70 118v92l130 40V158z" fill="#8e99a4"/>' +
        '<path d="M330 118v92l-130 40V158z" fill="#d5dbe1"/>' +
        '<path d="M150 96l50 16 50-16" stroke="#ff6a1a" stroke-width="6" fill="none"/>' +
        '<text x="200" y="250" text-anchor="middle" fill="#f4f1ea" font-family="Arial,sans-serif" font-size="16">TAGLIANDO</text>'
    ),
    marmitta: plate(
      '<path d="M64 176h70l30-48h40" stroke="#5c656e" stroke-width="16" fill="none" stroke-linecap="round"/>' +
        '<rect x="188" y="112" width="150" height="52" rx="26" fill="#2a2e33" stroke="#9aa3ad" stroke-width="4"/>' +
        '<path d="M330 138h36" stroke="#8e99a4" stroke-width="10" stroke-linecap="round"/>' +
        '<path d="M210 112v-28M250 112v-20M290 112v-28" stroke="#ff6a1a" stroke-width="4"/>' +
        '<circle cx="86" cy="176" r="10" fill="#d5dbe1"/>'
    ),
    sella: plate(
      '<path d="M78 168c40-62 120-78 196-58 48 12 78 20 86 48 4 16-10 36-36 42-70 16-180 18-236 0-18-6-22-20-10-32z" fill="#241c16" stroke="#5a463c" stroke-width="4"/>' +
        '<path d="M120 150c40-20 90-24 140-8" stroke="#ff6a1a" stroke-width="4" fill="none"/>' +
        '<path d="M150 196h120" stroke="#8e99a4" stroke-width="6" stroke-linecap="round"/>'
    ),
    statore: plate(
      '<circle cx="200" cy="148" r="84" fill="none" stroke="#9aa3ad" stroke-width="16"/>' +
        '<circle cx="200" cy="148" r="34" fill="#2a241c" stroke="#e2b15a" stroke-width="8"/>' +
        '<g stroke="#e2b15a" stroke-width="8">' +
        '<path d="M200 78v28M200 190v28M130 148H102M298 148h-28M150 98l20 20M250 198l-20-20M250 98l-20 20M150 198l20-20"/>' +
        "</g>" +
        '<rect x="286" y="200" width="46" height="18" rx="3" fill="#d5dbe1"/>'
    ),
    leva: plate(
      '<circle cx="118" cy="176" r="22" fill="#d5dbe1" stroke="#8e99a4" stroke-width="4"/>' +
        '<path d="M136 164c70-18 150-62 196-78 10-4 20 8 12 18-40 46-120 92-196 112-8 2-16-6-12-14z" fill="#c5ccd3"/>' +
        '<circle cx="118" cy="176" r="8" fill="#ff6a1a"/>' +
        '<path d="M250 112l34-16" stroke="#8e99a4" stroke-width="6" stroke-linecap="round"/>'
    ),
  };

  window.PartArt = {
    render: function render(name) {
      return arts[name] || arts.kit;
    },
  };
})();
