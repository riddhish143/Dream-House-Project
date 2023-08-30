const { Console } = require("console");
const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const async = require("async");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "DreamHouse",
});
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

const static_path = path.join(__dirname, "/views");
app.use(express.static(static_path));
app.set("views", path.join(__dirname, "/views"));

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to database:", err);
    return;
  }

  console.log("Connected to database");
});

// -----------------------------------PropViewReport--------------------------------------------
app.get("/PropViewReport", (req, res) => {
  res.status(200).render("PropViewReport.html");
});
app.post("/PropViewReport", (req, res) => {
  const {
    property_number,
    client_number,
    property_type,
    property_view_date,
    property_address,
    property_comment,
  } = req.body;

  const PropReport = `
  INSERT INTO Pview (Property_number, Client_number, Property_type, Property_view_date, Property_address, Property_comment)
  VALUES (?, ?, ?, ?, ?, ?)
  `;
  connection.query(
    PropReport,
    [
      property_number,
      client_number,
      property_type,
      property_view_date,
      property_address,
      property_comment,
    ],
    (err, result) => {
      if (err) {
        console.log("Error inserting data:", err);
        res.status(500).send("Error inserting data into database");
        return;
      }
      res.redirect("/PropReport");
    }
  );
});
let TableQuery, TableName;
app.get("/PropReport", function (req, res) {
  TableQuery = `SELECT * FROM Pview`;
  TableName = "Property View";
  connection.query(TableQuery, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// -----------------------------------PropViewReport----end-----------------------------------------

// -----------------------------------ClientReg----start----------------------------------------
app.get("/ClientReg", (req, res) => {
  res.status(200).render("ClientReg.html");
});

app.post("/ClientReg", (req, res) => {
  const {
    Client_number,
    Client_name,
    Client_pro_type,
    Client_tel_no,
    Client_max_rent,
    Branch_number,
    Staff_number,
    Client_reg_date,
    Branch_address,
  } = req.body;

  const clientRegQuery = `
  INSERT INTO Clients (Client_number, Client_name, Client_pro_type,Client_tel_no, Client_max_rent, Branch_number, Staff_number, Client_reg_date, Branch_address)
  VALUES (?, ?, ?, ?, ?,?, ?, ?, ?)
  `;
  connection.query(
    clientRegQuery,
    [
      Client_number,
      Client_name,
      Client_pro_type,
      Client_tel_no,
      Client_max_rent,
      Branch_number,
      Staff_number,
      Client_reg_date,
      Branch_address,
    ],
    (err, result) => {
      if (err) {
        console.log("Error inserting data:", err);
        res.status(500).send("Error inserting data into database");
        return;
      }

      res.redirect("/ClientReport");
    }
  );
});

app.get("/ClientReport", function (req, res) {
  TableQuery = `SELECT * FROM Clients`;
  TableName = "Client Registration Report";
  connection.query(TableQuery, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
//------------------------------------clientReg-----end----------------------------

// -----------------------------------PropRegForm-----start----------------------------
app.get("/PropRegForm", (req, res) => {
  res.status(200).render("PropRegForm.html");
});

app.post("/PropRegForm", (req, res) => {
  const {
    property_number,
    property_type,
    property_address,
    property_rent,
    property_room,
    staff_number,
    property_deposit,
    branch_number,
  } = req.body;

  const propRegQuery = `INSERT INTO Properties (property_number, property_type, property_address, property_rent, property_room, staff_number, property_deposit, branch_number) VALUES (?, ?, ?, ?, ?, ?, ? ,?) `;
  connection.query(
    propRegQuery,
    [
      property_number,
      property_type,
      property_address,
      property_rent,
      property_room,
      staff_number,
      property_deposit,
      branch_number,
    ],
    (err, result) => {
      if (err) {
        console.log("Error inserting data:", err);
        res.status(500).send("Error inserting data into database");
        return;
      }

      res.redirect("/PropRegReport");
    }
  );
});

app.get("/PropRegReport", function (req, res) {
  TableQuery = `SELECT * FROM Properties`;
  TableName = "Property registration Report";
  connection.query(TableQuery, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// -----------------------------------PropRegForm-----end----------------------------

// --------------------------------LeaseForm----start----------------------
app.get("/LeaseForm", (req, res) => {
  res.status(200).render("LeaseForm.html");
});
app.post("/LeaseForm", (req, res) => {
  const {
    client_number,
    property_number,
    client_name,
    property_address,
    lease_rent,
    lease_deposit_paid,
    lease_s_date,
    lease_e_date,
    payment_method,
  } = req.body;

  const insertQuery = `
    INSERT INTO Lease (client_number, property_number, client_name, property_address, lease_rent, lease_deposit_paid, lease_s_date, lease_e_date, payment_method)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    insertQuery,
    [
      client_number,
      property_number,
      client_name,
      property_address,
      lease_rent,
      lease_deposit_paid,
      lease_s_date,
      lease_e_date,
      payment_method,
    ],
    (error, results, fields) => {
      if (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error inserting data into database");
        return;
      }
      res.redirect("/LeaseReport");
    }
  );
});

app.get("/LeaseReport", function (req, res) {
  TableQuery = `SELECT * FROM Lease`;
  TableName = "Lease Report";
  connection.query(TableQuery, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------LeaseForm----end----------------------

// --------------------------------Branches----start----------------------
app.get("/BranchForm", (req, res) => {
  res.status(200).render("Branches.html");
});
app.post("/BranchForm", (req, res) => {
  const {
    Branch_Number,
    Branch_Address,
    Branch_name,
    Branch_city,
    Branch_Tel,
  } = req.body;

  const branchInsert = `
    INSERT INTO Branches (Branch_Number, Branch_Address, Branch_name,
    Branch_city, Branch_Tel)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    branchInsert,
    [Branch_Number, Branch_Address, Branch_name, Branch_city, Branch_Tel],
    (err, result) => {
      if (err) {
        console.log("Error inserting data:", err);
        res.status(500).send("Error inserting data into database");
        return;
      }
      res.redirect("/BranchList");
    }
  );
});
app.get("/BranchList", function (req, res) {
  TableQuery = `SELECT * FROM Branches`;
  TableName = "Branch List";
  connection.query(TableQuery, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------Branches----end----------------------

//--------------------------------PropOweners----start----------------------
app.get("/OwnerForm", (req, res) => {
  res.status(200).render("PropOweners.html");
});

app.post("/OwnerForm", (req, res) => {
  const {
    Powner_name,
    Powner_number,
    Powner_address,
    Powner_tel_no,
    Powner_type,
    Property_number,
  } = req.body;

  const insertQuery = `
    INSERT INTO Powner (Powner_name, Powner_number, Powner_address, Powner_tel_no, Powner_type, Property_number)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    insertQuery,
    [
      Powner_name,
      Powner_number,
      Powner_address,
      Powner_tel_no,
      Powner_type,
      Property_number,
    ],
    (error, results, fields) => {
      if (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error inserting data into database");
        return;
      }
      res.redirect("/OwnerReport");
    }
  );
});

app.get("/OwnerReport", function (req, res) {
  TableQuery = `SELECT * FROM Powner`;
  TableName = "Property Owner Report";
  connection.query(TableQuery, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
//--------------------------------PropOweners----end----------------------

// --------------------------------staffReg----start----------------------
app.get("/staffReg", (req, res) => {
  res.status(200).render("StaffRegForm.html");
});

app.post("/staffReg", (req, res) => {
  const {
    Staff_number,
    Full_name,
    Sex,
    DOB,
    Staff_position,
    Staff_salary,
    Staff_hired_date,
    Staff_bonus_pay,
    Staff_supervisor_name,
    Branch_number,
  } = req.body;

  const insertQuery = `
    INSERT INTO staff (Staff_number, Full_name, Sex, DOB, Staff_position, Staff_salary, Staff_hired_date, Staff_bonus_pay, Staff_supervisor_name, Branch_number)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    insertQuery,
    [
      Staff_number,
      Full_name,
      Sex,
      DOB,
      Staff_position,
      Staff_salary,
      Staff_hired_date,
      Staff_bonus_pay,
      Staff_supervisor_name,
      Branch_number,
    ],
    (error, results, fields) => {
      if (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error inserting data into database");
        return;
      }

      res.redirect("/staffReport");
    }
  );
});

app.get("/StaffReport", function (req, res) {
  TableQuery = `SELECT * FROM Staff`;
  TableName = "Staff Report";
  connection.query(TableQuery, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------staffReg----end----------------------
// --------------------------------Advertisement----start----------------------
app.get("/AdvertisementForm", (req, res) => {
  res.status(200).render("Advertisement.html");
});

app.post("/AdvertisementForm", (req, res) => {
  const { advertisement_id, property_number, advertisement_date } = req.body;

  const insertQuery = `
    INSERT INTO Advertisements (advertisement_id, property_number, advertisement_date)
    VALUES (?, ?, ?)
  `;
  connection.query(
    insertQuery,
    [advertisement_id, property_number, advertisement_date],
    (error, results, fields) => {
      if (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error inserting data into database");
        return;
      }
      res.redirect("/Advertisements");
    }
  );
});
app.get("/Advertisements", function (req, res) {
  TableQuery = `SELECT * FROM Advertisements`;
  TableName = "Advertisement Report";
  connection.query(TableQuery, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------Advertisement----end----------------------
TableName = "";
// --------------------------------anyquery----start----------------------
// let QueryStatement;
// let error_msg = "";
// app.get("/anyquery", function (req, res) {
//   let anyquery = req.query.anyquery;
//   anyquery = anyquery.replace(/'/g, "\\'");
//   QueryStatement = "Query: " + anyquery;
//   connection.query(anyquery, function (err, rows) {
//     if (err) console.log(err.message);
//     const template = generateTemplate(rows);
//     res.send(template);
//   });
// });
let QueryStatement;
app.get("/anyquery", function (req, res) {
  let anyquery = req.query.anyquery;
  QueryStatement = "Query: "+ anyquery;
  connection.query(anyquery, function (err, rows) {
    if (err) console.log(err.message);
    const template = generateTemplate(rows);
    res.send(template);
  });
});

// --------------------------------anyquery----end----------------------

// --------------------------------------query1--------------------------------------
app.get("/query1", function (req, res) {
  QueryStatement =
    "Query1: List details of staff supervised by a named Supervisor at the branch.";
  const que1_Supervisor_name = req.query.que1_Supervisor_name;
  const que1_Branch_number = req.query.que1_Branch_number;
  const query1 = `
Select * from staff where staff_supervisor_name = '${que1_Supervisor_name}' and Branch_number = '${que1_Branch_number}';
`;
  connection.query(query1, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query2-------------------------------------

app.get("/query2", function (req, res) {
  QueryStatement =
    "Query2: List details of all Assistants alphabetically by name at the branch.";
  const que2_Branch_number = req.query.que2_Branch_number;
  const query2 = `
SELECT *
FROM Staff
WHERE Staff_position = 'Assistant' AND Branch_number = '${que2_Branch_number}'
ORDER BY Full_name ASC;
`;
  connection.query(query2, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query2 end--------------------------------------

// --------------------------------------query3 start--------------------------------------
app.get("/query3", function (req, res) {
  QueryStatement =
    "Query3: List the details of property (including the rental deposit) available for rent at the branch, along with the owner's details.";
  const que3_Branch_number = req.query.que3_Branch_number;
  const query3 = `
SELECT
p.Property_number,
p.Property_type,
p.Property_address,
p.Property_rent,
p.Property_room,
po.Powner_name,
po.Powner_address,
po.Powner_tel_no,
p.Property_deposit
FROM
Properties p
JOIN Powner po ON p.Property_number = po.Property_number
JOIN Branches b ON p.Branch_number = b.Branch_number
WHERE
p.Branch_number = '${que3_Branch_number}' AND p.Property_rent > 0;
`;
  connection.query(query3, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query3 end--------------------------------------

// --------------------------------------query4 start--------------------------------------
app.get("/query4", function (req, res) {
  QueryStatement =
    "Query4: List the details of properties managed by a named member of staff at the branch.";
  const que4_Branch_number = req.query.que4_Branch_number;
  const que4_Staff_number = req.query.que4_Staff_number;
  const query4 = `
Select Properties.* , Powner.* from Properties
join Powner on Properties.Property_number = Powner.Property_number
where Properties.Staff_number = '${que4_Staff_number}' and Properties.Branch_number = '${que4_Branch_number}';
`;
  connection.query(query4, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query4 end--------------------------------------

// --------------------------------------query5 start--------------------------------------
app.get("/query5", function (req, res) {
  QueryStatement =
    "Query5: List the clients registering at the branch and the names of the members of staff who registered the clients.";
  const que5_Branch_number = req.query.que5_Branch_number;
  const query5 = `
SELECT c.Client_number, c.Client_name, c.Client_reg_date, s.Full_name AS Staff_name
FROM Clients c
JOIN Staff s ON c.Staff_number = s.Staff_number
WHERE c.Branch_number = '${que5_Branch_number}';
`;
  connection.query(query5, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query5 end--------------------------------------

// --------------------------------------query6 start--------------------------------------
app.get("/query6", function (req, res) {
  QueryStatement =
    "Query6: Identify properties located in Glasgow with rents no higher than £450.";
  const query6 = `
SELECT Property_number, Property_type, Property_address, Property_rent FROM Properties WHERE Property_address LIKE '%Glasgow%' AND Property_rent <= 450`;
  connection.query(query6, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query6 end--------------------------------------

// --------------------------------------query7 start--------------------------------------

app.get("/query7", function (req, res) {
  QueryStatement =
    "Query7: Identify the name and telephone number of an owner of a given property.";
  const que7_Property_number = req.query.que7_Property_number;
  const query7 = `
    Select Powner_name , Powner_tel_no from Powner Where Property_number = '${que7_Property_number}';
    `;
  connection.query(query7, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query7 end--------------------------------------

// --------------------------------------query8 start--------------------------------------
app.get("/query8", function (req, res) {
  QueryStatement =
    "Query8: List the details of comments made by clients viewing a given property.";
  const que8_Property_number = req.query.que8_Property_number;
  const query8 = `SELECT Property_comment FROM Pview WHERE Property_number = '${que8_Property_number}' AND Property_comment IS NOT NULL`;
  connection.query(query8, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query8 end--------------------------------------

// --------------------------------------query9 start--------------------------------------
app.get("/query9", function (req, res) {
  QueryStatement =
    "Query9: Display the names and phone numbers of clients who have viewed a given property but not supplied comments.";
  const que9_Property_number = req.query.que9_Property_number;
  const query9 = `
  SELECT Clients.Client_name, Clients.Client_tel_no
  FROM Clients
  INNER JOIN Pview ON Clients.Client_number = Pview.Client_number
  WHERE Pview.Property_number = '${que9_Property_number}' AND Pview.Property_comment IS NULL;
  `;
  connection.query(query9, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query9 end--------------------------------------

// --------------------------------------query10 start--------------------------------------
app.get("/query10", function (req, res) {
  QueryStatement =
    "Query10: Display the details of a lease between a named client and a given property.";
  const que10_Property_number = req.query.que10_Property_number;
  const que10_Client_name = req.query.que10_Client_name;
  const query10 = `
  SELECT *
  FROM Lease
  WHERE Client_name = '${que10_Client_name}'
  AND Property_number = '${que10_Property_number}';
  `;
  connection.query(query10, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query10 end--------------------------------------

// --------------------------------------query11 start--------------------------------------
app.get("/query11", function (req, res) {
  QueryStatement =
    "Query11: Identify the leases due to expire next month at the branch.";
  const query11 = `
  SELECT *
  FROM Lease
  WHERE DATE_ADD(Lease_e_date, INTERVAL 1 MONTH) >= NOW()
  AND DATE_ADD(Lease_e_date, INTERVAL 1 MONTH) < DATE_ADD(NOW(), INTERVAL 1 MONTH); `;
  connection.query(query11, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query11 end--------------------------------------

// --------------------------------------query12 start--------------------------------------
app.get("/query12", function (req, res) {
  QueryStatement =
    "Query12:List the details of properties that have not been rented out for more than three months";
  const query12 = `
    Select Properties.* from  Properties, Lease  where lease_duration < 3 and Properties.Property_number = Lease.Property_number
    `;
  connection.query(query12, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query12 end--------------------------------------

// --------------------------------------query13 start--------------------------------------
app.get("/query13", function (req, res) {
  QueryStatement =
    "Query13: Produce a list of clients whose preferences match a particular property.";
  const que13_Property_type = req.query.que13_Property_type;
  const que13_Property_rent = req.query.que13_Property_rent;
  const query13 = `
    SELECT DISTINCT c.Client_number, c.Client_name, c.Client_pro_type, c.Client_max_rent
    FROM Clients c
    INNER JOIN Properties p ON c.Branch_number = p.Branch_number
    WHERE p.Property_type = '${que13_Property_type}' AND p.Property_rent <= '${que13_Property_rent}' ; `;
  connection.query(query13, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query13 end--------------------------------------

// --------------------------------------query14 start--------------------------------------
app.get("/query14", function (req, res) {
  QueryStatement = "Query14: List the details of branches in a given city";
  const que14_Branch_city = req.query.que14_Branch_city;
  const query14 = `
  SELECT * FROM Branches WHERE Branch_city ='${que14_Branch_city}';
    `;
  connection.query(query14, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query14 end--------------------------------------
// --------------------------------------query15 start--------------------------------------

app.get("/query15", function (req, res) {
  QueryStatement =
    "Query15: Identify the total number of branches in each city.";
  const query15 = `
  SELECT Branch_city, COUNT(*) as Total_Branches FROM Branches GROUP BY Branch_city;
    `;
  connection.query(query15, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});

// --------------------------------------query15 end--------------------------------------
// --------------------------------------query16 start--------------------------------------
app.get("/query16", function (req, res) {
  QueryStatement =
    "Query16: List the name, position, and salary of staff at a given branch, ordered by staff name";
  const que16_Branch_number = req.query.que16_Branch_number;
  const query16 = `
  SELECT Full_name, Staff_position, Staff_salary FROM Staff WHERE Branch_number = '${que16_Branch_number}' ORDER BY Full_name;
    `;
  connection.query(query16, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query16 end--------------------------------------
// --------------------------------------query17 start--------------------------------------
app.get("/query17", function (req, res) {
  QueryStatement =
    "Query17: Identify the total number of staff and the sum of their salaries.";
  const query17 = `
  SELECT COUNT(*) as Total_Staff, SUM(Staff_salary) as Total_Salary FROM Staff;
    `;
  connection.query(query17, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query17 end--------------------------------------
// --------------------------------------query18 start--------------------------------------
app.get("/query18", function (req, res) {
  QueryStatement =
    "Query18: Identify the total number of staff in each position at branches in Glasgow.";
  const query18 = `
  SELECT Staff_position, COUNT(*) as Total_Staff FROM Staff
INNER JOIN Branches ON Staff.Branch_number = Branches.Branch_number
WHERE Branches.Branch_city = 'Glasgow'
GROUP BY Staff_position;
    `;
  connection.query(query18, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query18 end--------------------------------------
// --------------------------------------query19 start--------------------------------------
app.get("/query19", function (req, res) {
  QueryStatement =
    "Query19: List the name of each Manager at each branch, ordered by branch address.;";
  const query19 = `
  SELECT Branch_address, Full_name as Manager_Name FROM Staff
INNER JOIN Branches ON Staff.Branch_number = Branches.Branch_number
WHERE Staff_position like '%Manager%'
ORDER BY Branch_address;
    `;
  connection.query(query19, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query19 end--------------------------------------
// --------------------------------------query20 start--------------------------------------
app.get("/query20", function (req, res) {
  QueryStatement =
    "Query20: List the names of staff supervised by a named Supervisor.";
  const que20_Staff_supervisor_name = req.query.que20_Staff_supervisor_name;
  const query20 = `
  SELECT Full_name FROM Staff
  WHERE Staff_supervisor_name = '${que20_Staff_supervisor_name}';
    `;
  connection.query(query20, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query20 end--------------------------------------
// --------------------------------------query21 start--------------------------------------
app.get("/query21", function (req, res) {
  QueryStatement =
    "Query21: List the property number, address, type, and rent of all properties in Glasgow, ordered by rental amount.;";
  const query21 = `
  SELECT Property_number, Property_address, Property_type, Property_rent
FROM Properties
WHERE Property_address like '%Glasgow%'
ORDER BY Property_rent;
    `;
  connection.query(query21, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query21 end--------------------------------------
// --------------------------------------query22 start--------------------------------------
app.get("/query22", function (req, res) {
  QueryStatement =
    "Query22: List the details of properties for rent managed by a named member of staff.";
  const que22_Full_name = req.query.que22_Full_name;
  const query22 = `
  SELECT *
FROM Properties
WHERE Staff_number = (SELECT Staff_number FROM Staff WHERE Full_name = '${que22_Full_name}');
    `;
  connection.query(query22, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query22 end--------------------------------------
// --------------------------------------query23 start--------------------------------------
app.get("/query23", function (req, res) {
  QueryStatement =
    "Query23: Identify the total number of properties assigned to each member of staff at a given branch.";
  const que23_Branch_number = req.query.que23_Branch_number;
  const query23 = `
  SELECT s.Staff_number, s.Full_name AS Staff_Name, COUNT(*) AS Total_properties
FROM Staff s
JOIN Properties p ON s.Staff_number = p.Staff_number
WHERE p.Branch_number = '${que23_Branch_number}'
GROUP BY s.Staff_number;
    `;
  connection.query(query23, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query23 end--------------------------------------
// --------------------------------------query24 start--------------------------------------
app.get("/query24", function (req, res) {
  QueryStatement =
    "Query24: List the details of properties provided by business owners at a given branch.";
  const que24_Branch_number = req.query.que24_Branch_number;
  const query24 = `
  SELECT Properties.Property_number, Properties.Property_type, Properties.Property_address, Properties.Property_rent, Powner.Powner_name, Powner.Powner_address, Powner.Powner_tel_no
FROM Properties
JOIN Powner ON Properties.Property_number = Powner.Property_number
JOIN Branches ON Properties.Branch_number = Branches.Branch_number
WHERE Branches.Branch_number = '${que24_Branch_number}' and Powner.Powner_type like "%Business%";
    `;
  connection.query(query24, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query24 end--------------------------------------
// --------------------------------------query25 start--------------------------------------
app.get("/query25", function (req, res) {
  QueryStatement =
    "Query25:Identify the total number of properties of each type at all branches.";
  const query25 = `
  SELECT Property_type, COUNT(*) as Total_properties
FROM Properties
GROUP BY Property_type;
    `;
  connection.query(query25, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query25 end--------------------------------------
// --------------------------------------query26 start--------------------------------------
app.get("/query26", function (req, res) {
  QueryStatement =
    "Query26: Identify the details of private property owners that provide more than one property for rent.";
  const que26_Powner_type = req.query.que26_Powner_type;
  const que26_Property_type = req.query.que26_Property_type;
  const query26 = `
  SELECT Powner_number, Powner_name, Powner_address, Powner_tel_no, COUNT(*) as Total_properties
FROM Powner
INNER JOIN Properties ON Powner.Property_number = Properties.Property_number
WHERE Powner.Powner_type = '${que26_Powner_type}' AND Properties.Property_type = '${que26_Property_type}'
GROUP BY Powner.Powner_number
HAVING COUNT(*) >= 1
    `;
  connection.query(query26, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query26 end--------------------------------------
// --------------------------------------query27 start--------------------------------------
app.get("/query27", function (req, res) {
  QueryStatement =
    "Query27: Identify flats with at least three rooms and with a monthly rent no higher than £500 in Aberdeen.";
  const que27_Property_type = req.query.que27_Property_type;
  const query27 = `
  SELECT *
FROM Properties
WHERE Property_type = '${que27_Property_type}' AND Property_room >= 3 AND Property_rent <= 500 AND Property_address LIKE '%Aberdeen%';
    `;
  connection.query(query27, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query27 end--------------------------------------
// --------------------------------------query28 start--------------------------------------

app.get("/query28", function (req, res) {
  QueryStatement =
    "Query28: List the number, name, and telephone number of clients and their property preferences at a given branch.";
  const que28_Branch_number = req.query.que28_Branch_number;
  const query28 = `
  SELECT Client_number, Client_name, Client_tel_no, Client_pro_type, Client_max_rent
FROM Clients
WHERE Branch_number = '${que28_Branch_number}';
    `;
  connection.query(query28, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query28 end--------------------------------------
// --------------------------------------query29 start--------------------------------------
app.get("/query29", function (req, res) {
  QueryStatement =
    "Query29: Identify the properties that have been advertised more than the average number of times.";
  const query29 = `
  SELECT Properties.Property_number, COUNT(*) AS num_advertisements
FROM Properties
JOIN Advertisements ON Properties.Property_number = Advertisements.Property_number
GROUP BY Properties.Property_number
HAVING COUNT(*) > (SELECT AVG(num_advertisements) FROM (SELECT COUNT(*) AS num_advertisements FROM Advertisements GROUP BY Property_number) AS t);
    `;
  connection.query(query29, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query29 end--------------------------------------
// --------------------------------------query30 start--------------------------------------
app.get("/query30", function (req, res) {
  QueryStatement =
    "Query30: List the details of leases due to expire next month at a given branch.";
  const que30_Branch_number = req.query.que30_Branch_number;
  const query30 = `
  SELECT Lease.*
FROM Lease
INNER JOIN Properties ON Lease.Property_number = Properties.Property_number
INNER JOIN Branches ON Properties.Branch_number = Branches.Branch_number
WHERE MONTH(Lease_e_date) = MONTH(DATE_ADD(CURRENT_DATE, INTERVAL 1 MONTH))
AND YEAR(Lease_e_date) = YEAR(DATE_ADD(CURRENT_DATE, INTERVAL 1 MONTH))
AND Branches.Branch_number = '${que30_Branch_number}';
    `;
  connection.query(query30, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query30 end--------------------------------------
// --------------------------------------query31 start--------------------------------------
app.get("/query31", function (req, res) {
  QueryStatement =
    "Query31: List the total number of leases with rental periods that are less than one year at branches in London";
  const que31_Branch_city = req.query.que31_Branch_city;
  const query31 = `
  SELECT COUNT(*) AS Total_Leases
FROM Lease AS l
JOIN Properties AS p ON l.Property_number = p.Property_number
JOIN Branches AS b ON p.Branch_number = b.Branch_number
WHERE DATEDIFF(l.Lease_e_date, l.Lease_s_date) < 365
  AND b.Branch_city = '${que31_Branch_city}';
    `;
  connection.query(query31, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});
// --------------------------------------query31 end--------------------------------------
// --------------------------------------query32 start--------------------------------------
app.get("/query32", function (req, res) {
  QueryStatement =
    "Query32: List the total possible daily rental for property at each branch, ordered by branch number";
  const query32 = `
  SELECT p.Branch_number, SUM(p.Property_rent * 12 / 365) AS Total_Daily_Rental
FROM Properties AS p
GROUP BY p.Branch_number
ORDER BY p.Branch_number;
    `;
  connection.query(query32, function (err, rows) {
    if (err) throw err;
    const template = generateTemplate(rows);
    res.send(template);
  });
});

function generateTemplate(rows) {
  let template = "<!DOCTYPE html><html><head>";
  if (TableName) template += "<title>" + TableName + "</title>";
  else template += "<title>queries</title>";
  template +=
    '<link rel="stylesheet" href="../static/pages/style.css"><script src="../static/components/header.js" type="text/javascript" defer></script>';
  template += "<style>main{max-width: 90%} </style>";
  template += "</head><body>";
  template +=
    '<div id="navbar" class="page"><header-component></header-component></div><div id="form" class="page"><main>';
  if (TableName) template += "<h1 id='heading'>" + TableName + "</h1><table>";
  else template += "<h3 id='heading'>" + QueryStatement + " </h3>";
  if (!rows || rows.length === 0) {
    template += "<h1 style='text-align: center;'>No data found</h1>";
  } else {
    template += "<div style='overflow-x:auto'>\n";
    template += "<table>\n";
    template += "<thead>\n";
    template += "<tr>\n";
    Object.keys(rows[0]).forEach((column) => {
      template += `<th>${column}</th>\n`;
    });
    template += "</tr>\n";
    template += "</thead>\n";
    template += "<tbody>\n";
    rows.forEach((row) => {
      template += "<tr>\n";
      Object.values(row).forEach((value) => {
        template += `<td>${value}</td>\n`;
      });
      template += "</tr>\n";
    });
    template += "</tbody>\n";
    template += "</table>\n";
    template += "</div>\n";
  }
  template += "</body>\n";
  template += "</html>\n";
  return template;
}

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
