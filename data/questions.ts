import type { Answers, Question } from "@/types/questionnaire";

export const questions: Question[] = [
  {
    id: "contact_name",
    section: "01 · Στοιχεία επιχείρησης",
    title: "Ποιο είναι το πλήρες ονοματεπώνυμο του βασικού υπεύθυνου του project;",
    type: "text",
    required: true,
    placeholder: "Παναγιώτης Μπαρμπίτσας"
  },
  {
    id: "contact_email",
    section: "01 · Στοιχεία επιχείρησης",
    title: "Ποιο email θέλετε να χρησιμοποιούμε για την επικοινωνία του project;",
    type: "email",
    required: true,
    placeholder: "name@example.com"
  },
  {
    id: "contact_phone",
    section: "01 · Στοιχεία επιχείρησης",
    title: "Ποιο είναι το βασικό τηλέφωνο επικοινωνίας;",
    type: "tel",
    required: true,
    placeholder: "+41 ... ή +30 ..."
  },
  {
    id: "legal_name",
    section: "01 · Στοιχεία επιχείρησης",
    title: "Ποια είναι η πλήρης νομική επωνυμία της επιχείρησης που θα υπογράψει τη σύμβαση;",
    type: "text",
    required: true,
    placeholder: "Όπως εμφανίζεται επίσημα στα εταιρικά έγγραφα"
  },
  {
    id: "legal_details",
    section: "01 · Στοιχεία επιχείρησης",
    title: "Ποια είναι η νομική μορφή, η χώρα και η πλήρης έδρα της επιχείρησης;",
    description: "Γράψτε νομική μορφή, οδό, αριθμό, Τ.Κ., πόλη και χώρα.",
    type: "textarea",
    required: true,
    placeholder: "π.χ. GmbH / AG / ατομική επιχείρηση, διεύθυνση, πόλη, Ελβετία"
  },
  {
    id: "company_ids",
    section: "01 · Στοιχεία επιχείρησης",
    title: "Υπάρχουν Swiss UID, αριθμός εμπορικού μητρώου ή VAT number;",
    description: "Καταγράψτε όσα υπάρχουν σήμερα. Αν κάποιο στοιχείο δεν υπάρχει ή δεν το έχετε πρόχειρο, μπορείτε να το σημειώσετε.",
    type: "textarea",
    placeholder: "UID / Registry No. / VAT No."
  },
  {
    id: "legal_representative",
    section: "01 · Στοιχεία επιχείρησης",
    title: "Ποιος είναι ο νόμιμος εκπρόσωπος της επιχείρησης και με ποια ιδιότητα υπογράφει;",
    type: "text",
    required: true,
    placeholder: "Ονοματεπώνυμο — ιδιότητα"
  },
  {
    id: "seller_entity_same",
    section: "01 · Στοιχεία επιχείρησης",
    title: "Η ίδια επιχείρηση θα είναι και ο πωλητής του e-shop;",
    type: "single",
    required: true,
    options: ["Ναι", "Όχι", "Δεν έχει αποφασιστεί ακόμη"]
  },
  {
    id: "seller_entity_details",
    section: "01 · Στοιχεία επιχείρησης",
    title: "Ποια εταιρεία προβλέπεται να είναι ο πωλητής του e-shop;",
    description: "Αν δεν έχει αποφασιστεί ακόμη, γράψτε τι εξετάζετε σήμερα.",
    type: "textarea",
    required: true,
    condition: { questionId: "seller_entity_same", oneOf: ["Όχι", "Δεν έχει αποφασιστεί ακόμη"] },
    placeholder: "Επωνυμία, χώρα ή ό,τι γνωρίζετε μέχρι σήμερα"
  },
  {
    id: "invoice_country",
    section: "01 · Στοιχεία επιχείρησης",
    title: "Από ποια χώρα υπολογίζετε ότι θα εκδίδονται τα παραστατικά προς τους πελάτες του e-shop;",
    type: "single",
    required: true,
    options: ["Ελβετία", "Ελλάδα", "Άλλη χώρα", "Δεν έχει αποφασιστεί ακόμη"]
  },
  {
    id: "fulfilment_origin",
    section: "01 · Στοιχεία επιχείρησης",
    title: "Από πού θα αποθηκεύονται και θα αποστέλλονται τα προϊόντα;",
    description: "Μας ενδιαφέρει η χώρα/περιοχή και, αν είναι γνωστό, ποιος θα αναλαμβάνει πρακτικά τις αποστολές.",
    type: "textarea",
    required: true,
    placeholder: "π.χ. Μεσσηνία, Ελλάδα — αποστολές από ..."
  },
  {
    id: "launch_markets",
    section: "01 · Στοιχεία επιχείρησης",
    title: "Σε ποιες αγορές θέλετε να μπορεί να πουλά το brand στο αρχικό launch;",
    type: "multi",
    required: true,
    options: ["Ελλάδα", "Ευρωπαϊκή Ένωση", "Ελβετία", "Ηνωμένο Βασίλειο", "Άλλες αγορές"]
  },

  {
    id: "family_story",
    section: "02 · Προϊόν & παραγωγή",
    title: "Ποια είναι η ιστορία της οικογενειακής παραγωγής;",
    description: "Πότε ξεκίνησε, ποιοι άνθρωποι συνδέονται με αυτή και τι θεωρείτε σημαντικό να γνωρίζουμε για την οικογένεια και το ελαιόλαδο.",
    type: "textarea",
    required: true,
    placeholder: "Γράψτε ελεύθερα την ιστορία όπως τη γνωρίζετε σήμερα."
  },
  {
    id: "grove_details",
    section: "02 · Προϊόν & παραγωγή",
    title: "Τι γνωρίζουμε με ακρίβεια για τον ελαιώνα στη Βελίκα;",
    description: "Έκταση, περίπου αριθμός και ηλικία δέντρων, Κορωνέικη ποικιλία, καλλιεργητικές πρακτικές, τοποθεσία και οτιδήποτε άλλο θεωρείτε χρήσιμο.",
    type: "textarea",
    required: true,
    placeholder: "Όσα περισσότερα πραγματικά στοιχεία έχουμε, τόσο καλύτερα θα στηριχθεί η έρευνα."
  },
  {
    id: "supply_model",
    section: "02 · Προϊόν & παραγωγή",
    title: "Ποιο μέρος της παραγωγής είναι δικό σας και σε ποιες περιπτώσεις μπορεί να χρησιμοποιηθεί ελαιόλαδο από άλλους παραγωγούς της περιοχής;",
    type: "textarea",
    required: true,
    placeholder: "Περιγράψτε τη σημερινή ή προβλεπόμενη λογική παραγωγής και προμήθειας."
  },
  {
    id: "product_differentiators",
    section: "02 · Προϊόν & παραγωγή",
    title: "Ποια χαρακτηριστικά θεωρείτε εσείς ότι κάνουν το προϊόν ξεχωριστό;",
    description: "Δεν χρειάζεται να είναι τεχνικά. Μας ενδιαφέρει τι πιστεύετε εσείς ότι έχει πραγματική αξία για τον καταναλωτή.",
    type: "textarea",
    required: true,
    placeholder: "π.χ. τόπος, γεύση, φρεσκάδα, οικογενειακή παραγωγή, μέθοδος συγκομιδής..."
  },
  {
    id: "certifications",
    section: "02 · Προϊόν & παραγωγή",
    title: "Ποια από τα παρακάτω υπάρχουν ή εξετάζονται σήμερα;",
    description: "Επιλέξτε όσα ισχύουν.",
    type: "multi",
    required: true,
    options: [
      "Πιστοποίηση βιολογικού",
      "ΠΟΠ",
      "ΠΓΕ",
      "Εργαστηριακές αναλύσεις",
      "Βραβεύσεις / διακρίσεις",
      "Άλλη πιστοποίηση ή επίσημο στοιχείο",
      "Δεν υπάρχει κάτι από τα παραπάνω σήμερα",
      "Δεν γνωρίζω / χρειάζεται έλεγχος"
    ]
  },
  {
    id: "certification_notes",
    section: "02 · Προϊόν & παραγωγή",
    title: "Υπάρχει κάτι που πρέπει να γνωρίζουμε για πιστοποιήσεις, αναλύσεις ή claims του προϊόντος;",
    type: "textarea",
    placeholder: "Αναφέρετε ό,τι γνωρίζετε ή τι χρειάζεται να επιβεβαιωθεί."
  },
  {
    id: "certification_files",
    section: "02 · Προϊόν & παραγωγή",
    title: "Θέλετε να ανεβάσετε τώρα πιστοποιήσεις, αναλύσεις ή άλλα σχετικά έγγραφα;",
    description: "Τα αρχεία θα αποθηκευτούν απευθείας στον κοινόχρηστο φάκελο του project στο Google Drive. Έως 4 MB ανά αρχείο. Για μεγαλύτερα αρχεία μπορείτε να χρησιμοποιήσετε τον σύνδεσμο του shared folder.",
    type: "file",
    accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx",
    multiple: true,
    uploadTarget: "root"
  },
  {
    id: "launch_packaging",
    section: "02 · Προϊόν & παραγωγή",
    title: "Ποιες συσκευασίες θέλετε να υπάρχουν στο πρώτο launch;",
    type: "multi",
    required: true,
    options: [
      "500 ml μεταλλικό δοχείο",
      "Μικρές συσκευασίες για gift set",
      "Gift κασετίνα",
      "Μεγαλύτερη οικογενειακή συσκευασία",
      "Άλλη συσκευασία",
      "Δεν έχουν οριστικοποιηθεί ακόμη"
    ]
  },
  {
    id: "gift_box_details",
    section: "02 · Προϊόν & παραγωγή",
    title: "Τι γνωρίζουμε σήμερα για τη gift κασετίνα και τα προϊόντα που θα περιλαμβάνει;",
    type: "textarea",
    placeholder: "π.χ. 6 μικρά μπουκαλάκια, σαπουνάκι, επιπλέον προϊόν κ.λπ."
  },
  {
    id: "production_capacity",
    section: "02 · Προϊόν & παραγωγή",
    title: "Τι παραγωγική δυνατότητα υπάρχει περίπου ανά ελαιοκομική περίοδο;",
    description: "Αν δεν υπάρχει ακόμη σαφής αριθμός, γράψτε μια εκτίμηση ή ότι χρειάζεται να υπολογιστεί.",
    type: "textarea",
    required: true,
    placeholder: "Ποσότητες, περιορισμοί ή δυνατότητα αύξησης παραγωγής"
  },

  {
    id: "brand_name_status",
    section: "03 · Brand & αγορά",
    title: "Σε ποιο σημείο βρίσκεστε σήμερα σχετικά με το όνομα του brand;",
    type: "single",
    required: true,
    options: [
      "Έχουμε ήδη αποφασίσει όνομα",
      "Έχουμε 2–3 ονόματα που εξετάζουμε",
      "Έχουμε μόνο μια γενική κατεύθυνση",
      "Δεν έχουμε αποφασίσει τίποτα ακόμη"
    ]
  },
  {
    id: "brand_name_details",
    section: "03 · Brand & αγορά",
    title: "Γράψτε μας ό,τι υπάρχει μέχρι σήμερα για το όνομα ή την κατεύθυνση του brand.",
    type: "textarea",
    required: true,
    condition: {
      questionId: "brand_name_status",
      oneOf: ["Έχουμε ήδη αποφασίσει όνομα", "Έχουμε 2–3 ονόματα που εξετάζουμε", "Έχουμε μόνο μια γενική κατεύθυνση"]
    },
    placeholder: "Ονόματα, λέξεις, σκέψεις ή κατεύθυνση"
  },
  {
    id: "trademark_status",
    section: "03 · Brand & αγορά",
    title: "Έχει γίνει μέχρι σήμερα έλεγχος για εμπορικό σήμα ή domain;",
    type: "single",
    required: true,
    options: [
      "Ναι, έχει γίνει έλεγχος και κατοχύρωση",
      "Έχει γίνει μόνο προκαταρκτικός έλεγχος",
      "Έχουμε αγοράσει domain αλλά όχι trademark",
      "Όχι",
      "Δεν γνωρίζω"
    ]
  },
  {
    id: "liked_brands",
    section: "03 · Brand & αγορά",
    title: "Ποιες μάρκες ελαιολάδου ή άλλων premium τροφίμων σας αρέσουν και γιατί;",
    description: "Μπορείτε να γράψετε ονόματα ή links και τι συγκεκριμένα σας αρέσει σε κάθε περίπτωση.",
    type: "textarea",
    required: true,
    placeholder: "Brand / link — τι σας αρέσει"
  },
  {
    id: "avoid_brands",
    section: "03 · Brand & αγορά",
    title: "Υπάρχουν brands, αισθητικές ή τρόποι επικοινωνίας που δεν θέλετε να θυμίζει το δικό σας brand;",
    type: "textarea",
    placeholder: "Προαιρετικό, αλλά ιδιαίτερα χρήσιμο για το creative direction."
  },
  {
    id: "target_audience",
    section: "03 · Brand & αγορά",
    title: "Ποιον άνθρωπο φαντάζεστε να αγοράζει το προϊόν;",
    description: "Περιγράψτε όσο πιο πρακτικά μπορείτε τον βασικό πελάτη: χώρα, ηλικία, τρόπο ζωής, λόγο αγοράς, gifting ή καθημερινή χρήση.",
    type: "textarea",
    required: true,
    placeholder: "Δεν χρειάζεται να είναι marketing persona — γράψτε τον άνθρωπο που έχετε στο μυαλό σας."
  },
  {
    id: "price_level",
    section: "03 · Brand & αγορά",
    title: "Τι επίπεδο λιανικής τιμής έχετε σήμερα στο μυαλό σας για τα βασικά προϊόντα και τα gift sets;",
    description: "Αν δεν έχει αποφασιστεί, γράψτε το. Η απάντηση θα χρησιμοποιηθεί ως input για την έρευνα και όχι ως τελική δέσμευση τιμής.",
    type: "textarea",
    required: true,
    placeholder: "π.χ. 500 ml: €..., gift set: €..., ή δεν έχει αποφασιστεί ακόμη"
  },
  {
    id: "b2b_categories",
    section: "03 · Brand & αγορά",
    title: "Ποιες επαγγελματικές κατηγορίες θέλετε να προσεγγίσουμε;",
    description: "Επιλέξτε όσες θεωρείτε σχετικές.",
    type: "multi",
    required: true,
    options: [
      "Delicatessen",
      "Εστιατόρια",
      "Ξενοδοχεία",
      "Premium grocery stores",
      "Gourmet / specialty food stores",
      "Corporate gifts",
      "Distributors / importers",
      "Άλλη κατηγορία"
    ]
  },
  {
    id: "b2b_priorities",
    section: "03 · Brand & αγορά",
    title: "Ποιες 2–3 από αυτές τις επαγγελματικές κατηγορίες θεωρείτε σημαντικότερες στην αρχή;",
    type: "text",
    placeholder: "π.χ. delicatessen, εστιατόρια, ξενοδοχεία"
  },

  {
    id: "people_on_camera",
    section: "04 · Storytelling & παραγωγή υλικού",
    title: "Ποιοι άνθρωποι της οικογένειας ή της παραγωγής μπορούν και θέλουν να εμφανιστούν σε φωτογραφίες, συνεντεύξεις ή video;",
    type: "textarea",
    required: true,
    placeholder: "Ονόματα / ρόλοι και τυχόν περιορισμοί"
  },
  {
    id: "archive_available",
    section: "04 · Storytelling & παραγωγή υλικού",
    title: "Υπάρχει παλαιότερο οικογενειακό ή ιστορικό υλικό που θα μπορούσε να αξιοποιηθεί στο storytelling;",
    type: "single",
    required: true,
    options: ["Ναι", "Όχι", "Πρέπει να το αναζητήσω"]
  },
  {
    id: "archive_description",
    section: "04 · Storytelling & παραγωγή υλικού",
    title: "Τι είδους παλαιότερο υλικό υπάρχει ή πιστεύετε ότι μπορεί να βρεθεί;",
    description: "Παλιές φωτογραφίες, έγγραφα, οικογενειακό αρχείο, παλιές συσκευασίες, αποκόμματα κ.λπ.",
    type: "textarea",
    required: true,
    condition: { questionId: "archive_available", oneOf: ["Ναι", "Πρέπει να το αναζητήσω"] },
    placeholder: "Περιγράψτε ό,τι υπάρχει ή μπορεί να αναζητηθεί."
  },
  {
    id: "archive_images",
    section: "04 · Storytelling & παραγωγή υλικού",
    title: "Θέλετε να ανεβάσετε τώρα παλιές φωτογραφίες ή άλλο οπτικό υλικό;",
    description: "Οι εικόνες θα αποθηκευτούν στον φάκελο images του shared Google Drive. Έως 4 MB ανά αρχείο. Μεγαλύτερα αρχεία μπορούν να προστεθούν απευθείας στον κοινόχρηστο φάκελο.",
    type: "file",
    condition: { questionId: "archive_available", equals: "Ναι" },
    accept: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
    multiple: true,
    uploadTarget: "images"
  },
  {
    id: "harvest_timing",
    section: "04 · Storytelling & παραγωγή υλικού",
    title: "Ποια περίοδο υπολογίζετε σήμερα για την ελαιοσυγκομιδή;",
    description: "Αν γνωρίζετε πιθανή ημερομηνία έναρξης ή διάρκεια, καταγράψτε την. Το τελικό τριήμερο παραγωγής θα οργανωθεί αργότερα μαζί σας.",
    type: "textarea",
    required: true,
    placeholder: "π.χ. τελευταίο δεκαήμερο Οκτωβρίου — περίπου ... ημέρες"
  },
  {
    id: "filming_locations",
    section: "04 · Storytelling & παραγωγή υλικού",
    title: "Ποιοι χώροι μπορούν να είναι διαθέσιμοι για τα γυρίσματα;",
    type: "multi",
    required: true,
    options: ["Ελαιώνας", "Ελαιοτριβείο", "Χώρος τυποποίησης", "Αποθήκη", "Οικία / οικογενειακός χώρος", "Άλλος χώρος"]
  },
  {
    id: "filming_notes",
    section: "04 · Storytelling & παραγωγή υλικού",
    title: "Υπάρχει κάτι πρακτικό που πρέπει να γνωρίζουμε από τώρα για τους χώρους ή τα γυρίσματα;",
    type: "textarea",
    placeholder: "Πρόσβαση, άδειες, ώρες λειτουργίας, άνθρωποι που πρέπει να ενημερωθούν κ.λπ."
  },

  {
    id: "decision_maker",
    section: "05 · Εγκρίσεις & εμπιστευτικότητα",
    title: "Ποιος θα έχει την τελική έγκριση για το project;",
    description: "Θέλουμε να υπάρχει ένας ξεκάθαρος decision maker ώστε να μη δημιουργούνται αντικρουόμενες εγκρίσεις στη συνέχεια.",
    type: "text",
    required: true,
    placeholder: "Ονοματεπώνυμο"
  },
  {
    id: "approval_scope",
    section: "05 · Εγκρίσεις & εμπιστευτικότητα",
    title: "Σε ποια από τα παρακάτω θα έχει την τελική έγκριση ο παραπάνω υπεύθυνος;",
    type: "multi",
    required: true,
    options: ["Brand Strategy", "Logo / εταιρική ταυτότητα", "Packaging", "Scripts", "Παραγωγή", "Website", "Copy", "Social content", "Όλα τα παραπάνω"]
  },
  {
    id: "confidentiality",
    section: "05 · Εγκρίσεις & εμπιστευτικότητα",
    title: "Υπάρχουν πληροφορίες ή στοιχεία που δεν πρέπει να κοινοποιηθούν σε καμία περίπτωση πριν από το launch;",
    type: "single",
    required: true,
    options: ["Ναι", "Όχι"]
  },
  {
    id: "confidentiality_details",
    section: "05 · Εγκρίσεις & εμπιστευτικότητα",
    title: "Ποια στοιχεία θεωρείτε ιδιαίτερα εμπιστευτικά μέχρι το launch;",
    type: "textarea",
    required: true,
    condition: { questionId: "confidentiality", equals: "Ναι" },
    placeholder: "Αναφέρετε συγκεκριμένα ονόματα, πληροφορίες, έγγραφα ή θέματα που απαιτούν ιδιαίτερη προσοχή."
  },
  {
    id: "extra_notes",
    section: "05 · Εγκρίσεις & εμπιστευτικότητα",
    title: "Υπάρχει κάτι σημαντικό που δεν σας ρωτήσαμε και θεωρείτε ότι πρέπει να γνωρίζουμε πριν ξεκινήσουμε;",
    type: "textarea",
    placeholder: "Οτιδήποτε θεωρείτε χρήσιμο για να καταλάβουμε καλύτερα το project."
  },
  {
    id: "additional_files",
    section: "05 · Εγκρίσεις & εμπιστευτικότητα",
    title: "Θέλετε να ανεβάσετε επιπλέον αρχεία που θα μας βοηθήσουν στην πρώτη φάση;",
    description: "Έγγραφα, παρουσιάσεις, packaging references, σημειώσεις ή άλλα αρχεία. Θα αποθηκευτούν στον κοινόχρηστο φάκελο του project. Έως 4 MB ανά αρχείο.",
    type: "file",
    accept: ".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.ppt,.pptx,.xls,.xlsx",
    multiple: true,
    uploadTarget: "root"
  },
  {
    id: "confirmation",
    section: "05 · Εγκρίσεις & εμπιστευτικότητα",
    title: "Τελευταία επιβεβαίωση πριν την αποστολή",
    description: "Οι πληροφορίες θα χρησιμοποιηθούν από την Promoters και τους συνεργάτες του συγκεκριμένου έργου αποκλειστικά για την υλοποίηση της συμφωνημένης συνεργασίας.",
    type: "single",
    required: true,
    options: ["Συμφωνώ και επιβεβαιώνω ότι οι παραπάνω πληροφορίες είναι σωστές με βάση όσα γνωρίζω σήμερα"]
  }
];

export function isQuestionVisible(question: Question, answers: Answers) {
  if (!question.condition) return true;

  const answer = answers[question.condition.questionId];
  if (!answer) return false;

  const values = Array.isArray(answer) ? answer : [answer];

  if (question.condition.equals !== undefined) {
    return values.includes(question.condition.equals);
  }

  if (question.condition.notEquals !== undefined) {
    return !values.includes(question.condition.notEquals);
  }

  if (question.condition.oneOf) {
    return question.condition.oneOf.some((value) => values.includes(value));
  }

  return true;
}
