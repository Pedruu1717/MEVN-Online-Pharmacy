**Online Pharmacy website**

Made with MEVN stack - ***MongoDB, Express, Vue and Node***.
![arquitetura](./mevn_architecture.png)

### How to install:
- Install MENV CLI: ***npm install -g mevn-cli***
- Install dependencies in ./proj/server and in ./proj/client: ***npm install***
--------
### How to configure the MongoDB database:
- Install MongoDB Community Version
- Install Postman
- On MongoDB, create a Collection
- In Postman, use the following Restful methods POST, GET, PUT, DELETE at localhost:9000/api
-   .post('/', createData)
    .get('/', readData)
    .put('/:id', updateData)
    .delete('/:id', deleteData);
- Select "Body", use "raw" view and JSON format
- Write an object in the editor like this: {name: John, age: 20}
- Click "Send"
------------
### Run the website:
Run the website in directory ./proj with the following command: ***mevn serve***


Developed by:
- Pedro Melo
- Salif Faustino
- Diogo Figueiredo
- Manuel Cabral
