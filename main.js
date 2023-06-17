// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Factory function
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      let randBase = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      while (this.dna[randBase] === newBase) {
        newBase = returnRandBase();
      };
      this.dna[randBase] = newBase;
    },
    compareDNA(instance) {
      let similarities = this.dna.reduce((accumulator, currentValue, idx, arr) => {
        if (arr[idx] === instance.dna[idx]) {
          return accumulator + 1;
        } else {
          return accumulator;
        };
      }, 0);
      let percentageShared = (similarities/this.dna.length) * 100;
      let percentageTo2Decimal = percentageShared.toFixed(2);
    console.log(`${this.specimenNum} and ${instance.specimenNum} have ${percentageTo2Decimal}% DNA in common.`); 
    },
    willLikelySurvive() {
       const cOrG = this.dna.filter(el => el === "C" || el === "G");
      return cOrG.length / this.dna.length >= 0.6; 
    },
  };
};

let survivingSpecimen = [];
idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
  };
  idCounter++;
};

console.log(survivingSpecimen);
console.log(survivingSpecimen.length);