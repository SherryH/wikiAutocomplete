export class Subject {

}

Subject.prototype.pipe = jest.fn().mockReturnThis();
Subject.prototype.subscribe = jest.fn().mockReturnThis();
Subject.prototype.next = jest.fn();
