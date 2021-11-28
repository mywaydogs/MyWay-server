
import { Dog } from "./dogs/entities/dog.entity";
import { User} from "./users/entities/user.entity";
import { createConnection, createQueryBuilder, CustomRepositoryCannotInheritRepositoryError } from "typeorm";
import { Customer } from "./customers/entities/customer.entity";
export function dbpop(){

    console.log("connecting to db");
createConnection({ //TODO: export to .ENV
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "myway",
    entities: [
     
       __dirname = "src\\dogs\\entities\\*.entity.ts",
       __dirname = "src\\customers\\entities\\*.entity.ts",
        __dirname = "src\\users\\entities\\*.entity.ts"
    ],
    synchronize: true,
}).then(async connection => {
    // here you can start to work with your entities
console.log("db init");
console.log( __dirname + "./dogs/entities/*.entity.ts");
 let dog = new Dog()
 dog.name = "test doggie";
 dog.birthDate = null;
 dog.breed = "a test breed";
 dog.socialization = "test";
 dog.litterSeparation = "test";
 dog.origin = "test";
 dog.healthIssues = "none";
 dog.foodDrive = "Medium";
 dog.preyDrive = "High";
 dog.currentSchedule = "none";
 dog.energyLevel = "Low";
 dog.homeBehaviours = "test";
 dog.outsideBehaviours = "test";
 dog.customerId = 1;

 /* await createQueryBuilder()
        .insert()
        .values([
        { name: dog.name, birthdate: dog.birthDate, breed: dog.breed, socialization: dog.socialization, litterseperation: dog.litterSeparation, origin: dog.origin, healthissues: dog.healthIssues, fooddrive: dog.foodDrive, 
        preydrive: dog.preyDrive, currentschedule: dog.currentSchedule, energylevel: dog.energyLevel, homebehaviours: dog.homeBehaviours, customerid: dog.customerId  },
        
     ])
    .execute(); */
let user = new User()
user.id = 1;
user.email = "thisisatest@test.com";
user.password = "1234";
user.name = "user1";
user.aboutMe = null;
user.profileImage = null;

let customer = new Customer()
customer.id = 1;
customer.firstName = "test";
customer.lastName = "name";
customer.email = "testemail@test.com";
customer.phone = "000000";
customer.address = "street";
customer.userId = user.id;

const user_1 = await connection.manager
.save(user);
console.log(user_1);

const customer_1 = await connection.manager
.save(customer);
console.log(customer_1);

 const dog_1 = await connection.manager
 .save(dog);
 
        console.log(dog_1);

 
})


.catch(error => console.log(error));



}
dbpop()