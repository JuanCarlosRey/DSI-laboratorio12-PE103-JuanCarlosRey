import "mocha";
import { expect } from "chai";
import { Funko, Types } from "../src/funko-server/funko";
import { OperableUser } from "../src/funko-server/operaciones_usuario";

describe("Class UserOperations", () => {
    const funko_1 = new Funko(1, "Iron Man", "Funko de Iron Man", Types.Pop, "Película", "Marvel", 14, false, "", 15);
    const funko_2 = new Funko(2, "Batman", "Funko exclusivo de Batman", Types.Gold, "Cómic", "DC", 1, true, "Brilla en la oscuridad", 180);
    const funko_3 = new Funko(3, "Mario", "Funko de Mario", Types.PopRides, "Videojuego", "Nintendo", 57, false, "", 35);
    const funko_4 = new Funko(4, "Messi", "Funko exclusivo de Messi", Types.Gold, "Deportes", "FIFA", 1, true, "Hace sonidos al apretar su cabeza", 550);
    const new_funko_1 = new Funko(1, "Iron Man", "Funko exclusivo de Iron Man", Types.Pop, "Película", "Marvel", 1, true, "", 150);
    const user_1 = new OperableUser(1, "Paco", [funko_1, funko_2]);
    const user_2 = new OperableUser(2, "Jessica", [funko_1, funko_2, funko_3, funko_4]);

    it("addFunko()", () => {
        expect(user_1.addFunko(funko_1)).to.equal(-1);
        expect(user_1.addFunko(funko_3)).to.equal(0);
    });
    it("modifyFunko()", () => {
        expect(user_1.modifyFunko(new_funko_1)).to.equal(0);
        expect(user_1.modifyFunko(funko_4)).to.equal(-1);
    });
    it("deleteFunko()", () => {
        expect(user_1.deleteFunko(1)).to.equal(0);
        expect(user_1.deleteFunko(4)).to.equal(-1);
    });
    it("listFunko()", () => {
        expect(user_2.listFunko()).to.equal(0);
    });
    it("showFunkoInfo()", () => {
        expect(user_2.showFunkoInfo(1)).to.equal(0);
        expect(user_2.showFunkoInfo(2)).to.equal(0);
        expect(user_2.showFunkoInfo(3)).to.equal(0);
        expect(user_2.showFunkoInfo(4)).to.equal(0);
        expect(user_1.showFunkoInfo(10)).to.equal(-1);
    });
});