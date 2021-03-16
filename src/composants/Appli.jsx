import './Appli.scss';
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Accueil from './Accueil';
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import {firestore} from '../firebase';
import AjouterDossier from './AjouterDossier';

export default function Appli() {
  const [utilisateur, setUtilisateur] = useState(null);
  const etatDossiers = useState([]);
  const [dossiers, setDossiers] = etatDossiers;

  useEffect(
    () => {
     firebase.auth().onAuthStateChanged(
       util => {
        setUtilisateur(util);
        // Créer le profil de l'utilisateur dans Firestore si util n'est pas NULL
        if(util) {
          firestore.collection('utilisateurs').doc(util.uid).set({
            nom: util.displayName, 
            courriel: util.email, 
            datecompte: firebase.firestore.FieldValue.serverTimestamp()
          }, {merge: true});
        }
      }
     );
    }, []
  );

  // Gestion de la boîte de dialogue "Ajout Dossier"
  const [ouvert, setOuvert] = useState(false);
  
  function gererAjout(nom, couverture, couleur) {
    // Ajouter le dossier dans Firestore
    console.log("Les 3 paramètres de AjouterDossier : ", nom,couverture,couleur);
    const objDossier = {
      nom: nom,
      couverture: couverture,
      couleur: couleur,
      datemodif: firebase.firestore.FieldValue.serverTimestamp()
    };
    firestore.collection('utilisateurs').doc(utilisateur.uid).collection('dossiers').add(objDossier).then(
      refDoc => {
        setOuvert(false);
        refDoc.get().then(
          doc => setDossiers([...dossiers, {...doc.data(), id: doc.id}])
        )
      }
    )

    // Raffraîchir l'état de la variable "dossiers"
    //setDossiers([...dossiers, objDossier]);

    // Puis fermer la boîte de dialogue
    
  }

  return (
    <div className="Appli">
      {
        utilisateur ?
          <>
            <Entete utilisateur={utilisateur} />
            <section className="contenu-principal">
              <ListeDossiers utilisateur={utilisateur} etatDossiers={etatDossiers} />
              <AjouterDossier ouvert={ouvert} setOuvert={setOuvert} gererAjout={gererAjout} />
              <Fab onClick={() => setOuvert(true)} className="ajoutRessource" color="primary" aria-label="Ajouter dossier">
                <AddIcon />
              </Fab>
            </section>
          </>
        :
          <Accueil />
      }
    </div>
  );
}
