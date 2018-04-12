import LinkedList from '../components/grindquest/LinkedList';

it('creates, adds, removes elements in order', () => {
  var groceries = ['tomatoes','potatoes','peppers','eggplant'];
  var groceryList = new LinkedList();
  for(let i = 0;i < groceries.length;i++) {
    groceryList.addElem(groceries[i]);
  }
  expect(groceryList.length).toBe(groceries.length);
  
  let groceryArrayString = "["+groceries.join(',')+"]";
  expect(groceryList.toString()).toBe(groceryArrayString);
  
  for(let i = 0;i < groceries.length;i++) {
    let groceryFromList = groceryList.removeElem(0);
    let groceryFromArray = groceries[i];
    expect(groceryFromList).toBe(groceryFromArray);
  }
});

it('removes beginning, middle, end elements correctly', () => {
  var subjects = ['Calculus','Astronomy','Yoga','Latin'];
  var subjectList = new LinkedList();
  for(let i = 0;i < subjects.length;i++) {
    subjectList.addElem(subjects[i]);
  }
  //remove Yoga
  let yoga = subjectList.removeElem(2);
  expect(yoga).toBe("Yoga");
  expect(subjectList.length).toBe(subjects.length-1);
  expect(subjectList.toString()).toBe("[Calculus,Astronomy,Latin]");
  //remove Latin
  let latin = subjectList.removeElem(2);
  expect(latin).toBe("Latin");
  expect(subjectList.length).toBe(subjects.length-2);
  expect(subjectList.toString()).toBe("[Calculus,Astronomy]");
  //remove Astronomy
  let astronomy = subjectList.removeElem(1);
  expect(astronomy).toBe("Astronomy");
  expect(subjectList.length).toBe(subjects.length-3);
  expect(subjectList.toString()).toBe("[Calculus]");
  //remove Calculus
  let calculus = subjectList.removeElem(0);
  expect(calculus).toBe("Calculus");
  expect(subjectList.length).toBe(0);
  expect(subjectList.toString()).toBe("[]");
});

it('iterates beginning to end', () => {
  var subjects = ['Calculus','Astronomy','Yoga','Latin'];
  var subjectList = new LinkedList();
  for(let i = 0;i < subjects.length;i++) {
    subjectList.addElem(subjects[i]);
  }
  let subjectList_i = subjectList.iterator();
  expect(subjectList_i.hasNext()).toBe(true);
  //iterate to calculus
  expect(subjectList_i.next()).toBe('Calculus');
  expect(subjectList_i.hasNext()).toBe(true);
  //iterate to astronomy
  expect(subjectList_i.next()).toBe('Astronomy');
  //iterate to yoga
  expect(subjectList_i.next()).toBe('Yoga');
  //iterate to latin
  expect(subjectList_i.next()).toBe('Latin');
  //should be done
  expect(subjectList_i.hasNext()).toBe(false);
});

it('iterates with peaking', () => {
  var subjects = ['Calculus','Astronomy','Yoga','Latin'];
  var subjectList = new LinkedList();
  for(let i = 0;i < subjects.length;i++) {
    subjectList.addElem(subjects[i]);
  }
  let subjectList_i = subjectList.iterator();
  //peek and iterate to Calculus
  expect(subjectList_i.peekNext()).toBe('Calculus');
  subjectList_i.next();
  //peek and iterate until the end
  while(subjectList_i.hasNext()) {
    expect(subjectList_i.peekNext()).toBe(subjectList_i.next());
  }
});

it('iterates and deletes properly', () => {
  var subjects = ['Calculus','Astronomy','Yoga','Latin'];
  var subjectList = new LinkedList();
  for(let i = 0;i < subjects.length;i++) {
    subjectList.addElem(subjects[i]);
  }
  let subjectList_i = subjectList.iterator()
  expect(subjectList_i.hasNext()).toBe(true);
  //iterate to calculus and remove it
  subjectList_i.next();
  expect(subjectList_i.remove()).toBe('Calculus');
  expect(subjectList.toString()).toBe("[Astronomy,Yoga,Latin]");
  expect(subjectList_i.hasNext()).toBe(true);
  
  //iterate to latin and remove it
  subjectList_i.next();
  let latin = subjectList_i.next();
  expect(latin).toBe("Latin");
  expect(subjectList_i.remove()).toBe('Latin');
  expect(subjectList.toString()).toBe("[Astronomy,Yoga]");
  expect(subjectList_i.hasNext()).toBe(false);
});