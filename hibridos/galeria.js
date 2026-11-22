(function () {
  'use strict';

  const angles = ['Frente', 'Dianteira 3/4', 'Lateral', 'Traseira 3/4', 'Traseira', 'Painel', 'Bancos dianteiros', 'Bancos traseiros', 'Porta-malas', 'Quadro de instrumentos', 'Motor', 'Conector de recarga'];
  const cardPhotos = new Map();

  function photos(model) {
    return window.PHEV_FOTOS[model.id] || [model.photo];
  }

  function atAngle(model, angle) {
    return photos(model).findIndex(photo => photo.angulo === angle);
  }

  function nextIndex(model, index, step) {
    const count = photos(model).length;
    return (index + step + count) % count;
  }

  function image(photo, model, lazy = true) {
    const alt = photo.versaoConfirmada ? model.name : `Imagem representativa de ${model.brand} ${model.model}`;
    return `<img src="${esc(photo.src)}" alt="${esc(photo.angulo ? `${alt} · ${photo.angulo}` : alt)}" ${lazy ? 'loading="lazy"' : ''} decoding="async" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="hybrid-photo-missing" hidden>Foto indisponível na fonte</span>`;
  }

  function arrows(model, action) {
    if (photos(model).length < 2) return '';
    return `<button class="hybrid-photo-arrow previous" data-action="${action}" data-id="${model.id}" data-step="-1" aria-label="Foto anterior">‹</button>
      <button class="hybrid-photo-arrow next" data-action="${action}" data-id="${model.id}" data-step="1" aria-label="Próxima foto">›</button>`;
  }

  function card(model, controls = true) {
    const list = photos(model);
    const index = controls ? cardPhotos.get(model.id) ?? 0 : 0;
    const photo = list[index];
    return `<div class="hybrid-photo-card" ${controls ? `data-hybrid-gallery="${model.id}"` : ''} role="group" aria-label="Fotos de ${esc(model.name)}">
      <button class="photoButton" data-action="photo" data-id="${model.id}" data-photo="${index}" aria-label="Ampliar foto de ${esc(model.name)}">
        <span class="mediaBox">${image(photo, model)}</span>
        <span class="photoFoot"><span aria-live="polite">${esc(photo.angulo || (photo.versaoConfirmada ? 'Foto da versão' : 'Imagem da família'))}${list.length > 1 ? ` · ${index + 1}/${list.length}` : ''}</span><span>Ampliar</span></span>
      </button>
      ${controls ? arrows(model, 'photoCardStep') : ''}
    </div>`;
  }

  function stepCard(model, step, origin) {
    const node = el('cardList').querySelector(`[data-hybrid-gallery="${model.id}"]`);
    if (!node || photos(model).length < 2) return;
    const action = origin?.dataset.action;
    const restoreFocus = origin === document.activeElement;
    cardPhotos.set(model.id, nextIndex(model, cardPhotos.get(model.id) ?? 0, step));
    node.outerHTML = card(model);
    if (restoreFocus) {
      const target = el('cardList').querySelector(`[data-hybrid-gallery="${model.id}"]`);
      target?.querySelector(action === 'photoCardStep' ? `[data-step="${step}"]` : '.photoButton')?.focus({ preventScroll: true });
    }
  }

  function thumbnails(model, index) {
    const list = photos(model);
    if (list.length < 2) return '';
    return `<div class="hybrid-photo-thumbs" aria-label="Ângulos disponíveis">${list.map((item, i) => `<button data-action="photoThumb" data-id="${model.id}" data-photo="${i}" ${index == null ? '' : `aria-pressed="${index === i}"`} aria-label="${esc(item.angulo || 'Foto')} ${i + 1}">${image(item, model)}<span>${esc(item.angulo || 'Foto')}</span></button>`).join('')}</div>`;
  }

  function dialog(model, index, backToCompare) {
    const list = photos(model);
    const photo = list[index];
    return `<div class="bigPhoto hybrid-photo-large" data-hybrid-photo-dialog>
        ${image(photo, model, false)}${arrows(model, 'photoStep')}
      </div>
      <p class="hint hybrid-photo-credit">${index + 1}/${list.length} · ${esc(photo.angulo || (photo.versaoConfirmada ? 'Foto da versão' : 'Imagem representativa'))} · ${esc(photo.credit)} · ${urlLink(photo.page, 'Fonte da imagem')}</p>
      ${thumbnails(model, index)}
      <div class="photoLinks">
        <button class="btn soft" data-action="detail" data-id="${model.id}">Ver ficha</button>
        ${backToCompare ? '<button class="btn soft" data-action="compare">Voltar à comparação</button>' : ''}
      </div>`;
  }

  function compareCell(model, angle) {
    const index = atAngle(model, angle);
    if (index < 0) return '<td><span class="hybrid-photo-missing">Sem foto deste ângulo</span></td>';
    return `<td><button class="hybrid-compare-photo" data-action="photo" data-id="${model.id}" data-photo="${index}" aria-label="Ampliar ${esc(model.name)} · ${esc(angle)}">${image(photos(model)[index], model)}</button></td>`;
  }

  window.PHEV_GALERIA = { angles, photos, nextIndex, card, stepCard, thumbnails, dialog, compareCell };
})();
