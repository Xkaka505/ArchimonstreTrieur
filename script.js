const zoneSelect = document.getElementById('zoneSelect');
const souszonesContainer = document.getElementById('souszonesContainer');

fetch('ArchimonstreTrieur/archimonstres_par_zone.json')
  .then(res => res.json())
  .then(data => {

    data.zones.forEach(z => {
      const option = document.createElement('option');
      option.value = z.zone;
      option.textContent = z.zone;
      zoneSelect.appendChild(option);
    });


    zoneSelect.addEventListener('change', () => {
      souszonesContainer.innerHTML = ''; // vider l'ancien contenu
      const zone = data.zones.find(z => z.zone === zoneSelect.value);
      if (!zone) return;


      zone.souszones.forEach(sz => {
        const h2 = document.createElement('h2');
        h2.textContent = sz.souszone;
        souszonesContainer.appendChild(h2);


        sz.archimonstres.forEach(a => {
          const div = document.createElement('div');
          div.className = 'archimonstre';
          div.innerHTML = `<img src="${a.image_url}" alt="${a.nom}"> ${a.nom} (Étape ${a.etape})`;
          souszonesContainer.appendChild(div);
        });
      });
    });
  })
  .catch(err => console.error("Erreur lors du chargement du JSON :", err));

