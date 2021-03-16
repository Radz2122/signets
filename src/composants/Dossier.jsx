import './Dossier.scss'; 
import { IconButton } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import MoreVertIcon from '@material-ui/icons/MoreVert';
export default function Dossier({id, nom, couleur, datemodif, couverture}) {
  return (
    <article className="Dossier" style={{backgroundColor: couleur}}>
      <div className="couverture">
        <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
          <SortIcon />
        </IconButton>
        <img src={couverture} alt={nom}/>
      </div>
      <div className="info">
        <h2>{nom}</h2>
        <p>Modifié : {formaterDate(datemodif)}</p>
      </div>
      <IconButton className="modifier" aria-label="modifier" size="small">
        <MoreVertIcon />
      </IconButton>
    </article>
  );
}

/**
 * Formate les objets date de Firestore et retourne une chaîne de caractères
 * @param {Object} d Objet date de firestore
 * @returns String date formatée en français
 */
function formaterDate(d) {
  //console.log("Objet retourné par Firestore pour le champ datemodif de type timestamp : ", d);
  const nomsDesMois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const dateJs = new Date(d.seconds*1000);
  const jour = dateJs.getDate(); // un nombre entre 1 et 31
  const mois = dateJs.getMonth(); // un nombe entre 0 (jan) et 11 (déc)

  return `${jour} ${nomsDesMois[mois]} ${dateJs.getFullYear()}`;
}