import { expect } from 'chai';
import 'mocha';
import { Catcher } from '../../src/state_components/Catcher';

describe('Catcher class tests', function () {
  context('nextStateName Tests', function () {
    it('should return the nextStateName', function () {
      expect(new Catcher("myNextState").getNextStateName()).equal("myNextState");
    });

    it('should return new nextStateName', function () {
      let catcher = new Catcher("myNextState");
      catcher.setNextStateName("newNextState"); 
      expect(catcher.getNextStateName()).to.equal("newNextState");
    });
  });

  context('errorEquals Tests', function () {
    it('should return the default ErrorEquals', function () {
      expect(new Catcher("myNextState").getErrorEquals()).eql(["States.ALL"]);
    });

    it('should return the default ErrorEquals 0 position', function () {
      expect(new Catcher("myNextState").getErrorEquals()[0]).equal("States.ALL");
    });
  });

  context('toString Tests', function () {
    it('should return toString of Catcher', function () {
      let catcher = new Catcher("myNextState");
      console.log(catcher.toString());
      expect(catcher.toString()).to.equal('{'+
        '"ErrorEquals": ["States.ALL"],'+
        '"Next": "'+catcher.getNextStateName()+'"'+
      '}');
    });
  });
})