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