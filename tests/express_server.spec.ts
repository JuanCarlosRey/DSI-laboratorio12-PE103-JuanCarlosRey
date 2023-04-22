import "mocha";
import { expect } from "chai";
import request from 'request';

describe('Express server tests', () => {
    it('add', () => {
        let url = 'http://localhost:3000/funkos?user=gonzalo&id=18&name=Link&desc=Link Funko&type=Pop!&gender=Videogames&franch=The Legend of Zelda&number=4&excl=false&value=60';

        request.post({url: url, json: true}, (error: Error, response) => {
            expect(response.body).to.be.eql({
                "type": "success"
            });
        });

        request.post({url: url, json: true}, (error: Error, response) => {
            expect(response.body).to.be.eql({
                "type": "error",
                "output": "existing funko with same id"
            });
        });

        url = 'http://localhost:3000/funkos?user=gonzalo&id=18&desc=Link Funko&type=Pop!&gender=Videogames&franch=The Legend of Zelda&number=4&excl=false&value=60';

        request.post({url: url, json: true}, (error: Error, response) => {
            expect(response.body).to.be.eql({
                "type": "error",
                "output": "name is required"
            });
        });
    });

    it('update', () => {
        let url = 'http://localhost:3000/funkos?user=gonzalo&id=18&name=Link&desc=Link Funko&type=Pop!&gender=Videogames&franch=The Legend of Zelda&number=4&excl=false&value=50';

        request.patch({url: url, json: true}, (error: Error, response) => {
            expect(response.body).to.be.eql({
                "type": "success"
            });
        });

        url = 'http://localhost:3000/funkos?user=gonzalo&id=48&name=Link&desc=Link Funko&type=Pop!&gender=Videogames&franch=The Legend of Zelda&number=4&excl=false&value=50';
        
        request.patch({url: url, json: true}, (error: Error, response) => {
            expect(response.body).to.be.eql({
                "type": "error",
                "output": "funko with id 48 not found"
            });
        });
    });

    it('delete', () => {
        const url = 'http://localhost:3000/funkos?user=gonzalo&id=18';

        request.delete({url: url, json: true}, (error: Error, response) => {
            expect(response.body).to.be.eql({
                "type": "success"
            });
        });

        request.delete({url: url, json: true}, (error: Error, response) => {
            expect(response.body).to.be.eql({
                "type": "error",
                "output": "funko with id 18 not found"
            });
        });
    });

    it('list', () => {
        let url = 'http://localhost:3000/funkos?user=juancarlos';

        request.get({url: url, json: true}, (error: Error, response) => {
            expect(response.body).to.be.eql({
                "type": "success",
                "output": [
                  {
                    "_id": 0,
                    "_name": "Goku SSJ",
                    "_description": "Goku SSJ1 funko",
                    "_type": "Pop!",
                    "_gender": "Anime",
                    "_franchise": "Dragon Ball",
                    "_number": 157,
                    "_exclusive": false,
                    "_specialCaracteristics": "",
                    "_value": 45
                  },
                  {
                    "_id": 1,
                    "_name": "Cristiano Ronaldo",
                    "_description": "Cristiano Ronaldo funko",
                    "_type": "Pop! Rides",
                    "_gender": "Deportes",
                    "_franchise": "FIFA",
                    "_number": 21,
                    "_exclusive": false,
                    "_specialCaracteristics": "",
                    "_value": 70
                  },
                  {
                    "_id": 2,
                    "_name": "Mario Bros",
                    "_description": "Mario Bros funko",
                    "_type": "Pop! Rides",
                    "_gender": "Videojuegos",
                    "_franchise": "Super Mario Bros",
                    "_number": 1,
                    "_exclusive": true,
                    "_specialCaracteristics": "Brilla en la oscuridad",
                    "_value": 300
                  }
                ]
            });
        });

        url = 'http://localhost:3000/funkos?user=not_existing';

        request.get({url: url, json: true}, (error: Error, response) => {
            expect(response.body).to.be.eql({
                "type": "error",
                "output": "user not found"
            });
        });
    });

    it('show', () => {
        let url = 'http://localhost:3000/funkos?user=juancarlos&funko=0';

        request.get({url: url, json: true}, (error: Error, response) => {
            expect(response.body).to.be.eql({
                "type": "success",
                "output": {
                  "_id": 0,
                  "_name": "Goku SSJ",
                  "_description": "Goku SSJ1 funko",
                  "_type": "Pop!",
                  "_gender": "Anime",
                  "_franchise": "Dragon Ball",
                  "_number": 157,
                  "_exclusive": false,
                  "_specialCaracteristics": "",
                  "_value": 45
                }
            });
        });

        url = 'http://localhost:3000/funkos?user=juancarlos&funko=999';

        request.get({url: url, json: true}, (error: Error, response) => {
            expect(response.body).to.be.eql({
                "type": "error",
                "output": "funko not found"
            });
        });
    });
})