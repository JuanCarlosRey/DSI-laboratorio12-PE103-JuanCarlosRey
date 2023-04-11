import "mocha";
import { expect } from "chai";
import { Funko, Types } from "../src/ejercicio-3/funko";

describe("Class Funko", () => {
    const funko_1 = new Funko(1, "Iron Man", "Funko de Iron Man", Types.Pop, "Película", "Marvel", 14, false, "", 15);
    const funko_2 = new Funko(7, "Batman", "Funko exclusivo de Batman", Types.Gold, "Cómic", "DC", 1, true, "Brilla en la oscuridad", 200);
    it("getId()", () => {
        expect(funko_1.id).to.equal(1);
        expect(funko_2.id).to.equal(7);
    });
    it("getName()", () => {
        expect(funko_1.name).to.equal("Iron Man");
        expect(funko_2.name).to.equal("Batman");
    });
    it("getDescription()", () => {
        expect(funko_1.description).to.equal("Funko de Iron Man");
        expect(funko_2.description).to.equal("Funko exclusivo de Batman");
    });
    it("getType()", () => {
        expect(funko_1.type).to.equal(Types.Pop);
        expect(funko_2.type).to.equal(Types.Gold);
    });
    it("getGender()", () => {
        expect(funko_1.gender).to.equal("Película");
        expect(funko_2.gender).to.equal("Cómic");
    });
    it("getFranchise()", () => {
        expect(funko_1.franchise).to.equal("Marvel");
        expect(funko_2.franchise).to.equal("DC");
    });
    it("getNumber()", () => {
        expect(funko_1.number).to.equal(14);
        expect(funko_2.number).to.equal(1);
    });
    it("getExclusive()", () => {
        expect(funko_1.exclusive).to.equal(false);
        expect(funko_2.exclusive).to.equal(true);
    });
    it("getSpecialCaracteristics()", () => {
        expect(funko_1.specialCharacteristics).to.equal("");
        expect(funko_2.specialCharacteristics).to.equal("Brilla en la oscuridad");
    });
    it("getValue()", () => {
        expect(funko_1.value).to.equal(15);
        expect(funko_2.value).to.equal(200);
    });
});