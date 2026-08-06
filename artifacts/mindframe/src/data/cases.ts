export type Tag = 'Confirmation Bias' | 'Ad Hominem' | 'False Dilemma' | 'Appeal to Authority' | 'Loaded Question' | 'Hasty Generalization';
export type Suspect = { id: string; name: string; role: string; statement: string; tags: Tag[] };
export type Clue = { id: string; type: string; title: string; detail: string };
export type CaseFile = { id: string; title: string; location: string; victim: string; date: string; difficulty: 'Novice' | 'Field' | 'Expert'; synopsis: string; suspects: Suspect[]; clues: Clue[]; accusation: string; xp: number; unlocked: boolean };

export const tags: Tag[] = ['Confirmation Bias', 'Ad Hominem', 'False Dilemma', 'Appeal to Authority', 'Loaded Question', 'Hasty Generalization'];

export const cases: CaseFile[] = [
  { id: 'brass-lantern', title: 'The Brass Lantern', location: 'Cinder Street', victim: 'Elias Venn', date: 'October 14, 1987', difficulty: 'Novice', xp: 120, unlocked: true, synopsis: 'A respected watchmaker is found beneath the back room lamp. Three accounts. One has been polished until it shines.', accusation: 'mara', suspects: [
    { id: 'mara', name: 'Mara Quill', role: 'Apprentice', statement: 'Everyone knows the inspector has always distrusted me. If he says I was there, then he is simply repeating the same old story.', tags: ['Ad Hominem'] },
    { id: 'oswin', name: 'Oswin Pike', role: 'Neighbor', statement: 'I heard the crash at exactly nine. The street was quiet, so it could only have been the apprentice. There is no other possibility.', tags: ['False Dilemma'] },
    { id: 'ren', name: 'Ren Venn', role: 'Nephew', statement: 'My uncle trusted the apprentice completely. The brass ledger was in her hands, which proves she wanted the shop for herself.', tags: ['Confirmation Bias'] },
  ], clues: [
    { id: 'oil', type: 'TRACE', title: 'Machine oil on the sill', detail: 'A thin crescent of fresh oil sits outside the window, not near the workbench.' },
    { id: 'clock', type: 'TIMELINE', title: 'The stopped clock', detail: 'The impact stopped the clock at 8:42. Oswin says he heard the crash at nine.' },
    { id: 'ledger', type: 'PAPER', title: 'A clean ledger page', detail: 'One page was torn from the ledger. The tear marks predate the night of the murder.' },
  ] },
  { id: 'violet-hour', title: 'The Violet Hour', location: 'North Quay', victim: 'Nadia Sol', date: 'December 02, 1987', difficulty: 'Field', xp: 180, unlocked: true, synopsis: 'A radio host vanishes between two broadcasts. The studio door was locked from inside, but the story is full of exits.', accusation: 'cass', suspects: [
    { id: 'cass', name: 'Cass Bell', role: 'Producer', statement: 'Nadia was volatile all week. Any reasonable person could see she was about to run. I only followed the obvious conclusion.', tags: ['Hasty Generalization'] },
    { id: 'soren', name: 'Soren Vale', role: 'Rival host', statement: 'The station director says the keycard was mine, and he has run this place for twenty years. That settles it.', tags: ['Appeal to Authority'] },
    { id: 'ivo', name: 'Ivo March', role: 'Sound engineer', statement: 'Are you suggesting I should have ignored the screaming and kept the tape rolling? That would make me the monster here.', tags: ['Loaded Question'] },
  ], clues: [
    { id: 'reel', type: 'AUDIO', title: 'The reversed reel', detail: 'The final three seconds of the broadcast contain a door latch, reversed by hand.' },
    { id: 'keycard', type: 'ACCESS', title: 'The borrowed keycard', detail: 'Cass signed out Soren’s card six minutes before the final broadcast.' },
    { id: 'powder', type: 'TRACE', title: 'Violet powder', detail: 'A theatrical pigment appears on the inner lock and on Cass’s prop case.' },
  ] },
  { id: 'rain-room', title: 'The Rain Room', location: 'Morrow Hotel', victim: 'Juniper Gray', date: 'January 21, 1988', difficulty: 'Field', xp: 220, unlocked: false, synopsis: 'A guest falls from room 604 during a storm. The rain erased the footprints, not the assumptions.', accusation: 'theo', suspects: [
    { id: 'theo', name: 'Theo Crane', role: 'Bell captain', statement: 'The window was open, so she must have jumped. We should not invent a complicated answer for a simple room.', tags: ['False Dilemma'] },
    { id: 'milo', name: 'Milo Gray', role: 'Brother', statement: 'Juniper hated heights. Anyone who knew her would say the same. I cannot imagine she would do this.', tags: ['Confirmation Bias'] },
    { id: 'petra', name: 'Petra Moss', role: 'Guest', statement: 'The bell captain is a liar and always has been. His story is worthless because of who he is.', tags: ['Ad Hominem'] },
  ], clues: [
    { id: 'glass', type: 'MATERIAL', title: 'Glass on the carpet', detail: 'Glass fragments point inward. The window was broken after the fall.' },
    { id: 'glove', type: 'TRACE', title: 'A single glove', detail: 'A hotel glove is caught under the radiator, damp with river water.' },
    { id: 'receipt', type: 'PAPER', title: 'The dry receipt', detail: 'A receipt from the river ferry is dry despite the storm outside.' },
  ] },
  { id: 'last-tram', title: 'The Last Tram', location: 'Ashline Junction', victim: 'Victor Hale', date: 'February 08, 1988', difficulty: 'Expert', xp: 280, unlocked: false, synopsis: 'A conductor is found in an empty carriage after the last route. Every passenger remembers the same blue coat.', accusation: 'lyle', suspects: [
    { id: 'lyle', name: 'Lyle Hart', role: 'Conductor', statement: 'The schedule says the tram was empty at 11:10. The schedule is official, so no one could have boarded after that.', tags: ['Appeal to Authority'] },
    { id: 'dana', name: 'Dana Ro', role: 'Passenger', statement: 'I saw one blue coat. I have seen that coat before, which means it was definitely the same person.', tags: ['Hasty Generalization'] },
    { id: 'sol', name: 'Sol Kest', role: 'Dispatcher', statement: 'Did you come here to blame the dispatcher, or do you actually understand how a junction works?', tags: ['Loaded Question'] },
  ], clues: [
    { id: 'ticket', type: 'PAPER', title: 'The punched ticket', detail: 'A ticket punched at 11:18 sits beneath the conductor’s hand.' },
    { id: 'grease', type: 'TRACE', title: 'Grease on the brake', detail: 'The maintenance grease is fresh, and only one worker has access after midnight.' },
    { id: 'coat', type: 'TEXTILE', title: 'Blue wool thread', detail: 'The thread is from a uniform, not a passenger’s overcoat.' },
  ] },
  { id: 'quiet-archive', title: 'The Quiet Archive', location: 'Municipal Records', victim: 'Agnes Wren', date: 'March 17, 1988', difficulty: 'Expert', xp: 340, unlocked: false, synopsis: 'A city archivist dies among the records she was protecting. Someone has rearranged the past to hide a present debt.', accusation: 'rhea', suspects: [
    { id: 'rhea', name: 'Rhea Finch', role: 'Deputy archivist', statement: 'Agnes opposed the renovation. Since everyone who opposed it has been difficult, her resistance tells us exactly what kind of person she was.', tags: ['Hasty Generalization'] },
    { id: 'gale', name: 'Gale Voss', role: 'Contractor', statement: 'The mayor approved the demolition plans. Unless the mayor is secretly incompetent, the plans must be safe.', tags: ['Appeal to Authority'] },
    { id: 'elin', name: 'Elin Wren', role: 'Daughter', statement: 'Rhea keeps mentioning missing files because she wants you to look there. That is proof she is hiding something.', tags: ['Confirmation Bias'] },
  ], clues: [
    { id: 'catalogue', type: 'PAPER', title: 'The altered catalogue', detail: 'Three accession numbers have been rewritten in the same ink as Rhea’s daily log.' },
    { id: 'dust', type: 'TRACE', title: 'Dust on the archive key', detail: 'Only the deputy’s key has fresh dust from the sealed basement.' },
    { id: 'draft', type: 'PAPER', title: 'A demolition draft', detail: 'A draft agreement promises a private buyer access to one sealed collection.' },
  ] },
];