Create database DreamHome;
use DreamHome;
-- drop database DreamHome;

Create table Branches
(
	Branch_number varchar(55),
    Branch_name varchar(100),
    Branch_address varchar(255),
    Branch_city varchar(255),
    Branch_tel numeric(10),
    primary key(Branch_number)
);

Create table Staff
(
    Staff_number varchar(55) not null,
    Full_name varchar(55) not null,
    Sex Varchar(10) not null,
    DOB date not null,
    Staff_position varchar(55) not null,
    Staff_salary numeric(55) not null,
    Staff_hired_date date not null,
    Staff_bonus_pay numeric(55) ,
    Staff_supervisor_name varchar(55) not null,
    Branch_number varchar(55) not null,
    primary key(Staff_number),
    foreign key(Branch_number) references Branches(Branch_number) on delete cascade
);



Create table Properties
(
	Property_number varchar(55) not null,
    Property_type varchar(55) not null,
    Property_address varchar(255) not null,
    Property_rent numeric(10) not null,
    Property_room numeric(10) not null,
    Staff_number varchar(55) not null,
    Property_deposit numeric(55) not null,
    Branch_number varchar(55) not null,
    primary key(Property_number),
    foreign key(Branch_number) references Branches(Branch_number) on delete cascade,
    foreign key(Staff_number) references Staff(Staff_number) on delete cascade
);

create table Powner
(
	Powner_name varchar(55) not null,
    Powner_number varchar(55) not null,
    Powner_address varchar(255) not null,
    Powner_tel_no numeric(10) not null,
    Powner_type varchar(55) not null,
    Property_number varchar(55) not null,
    primary key(Powner_number),
    foreign key(Property_number) references Properties(Property_number) on delete cascade
);

Create table Clients
(
	Client_number varchar(55) not null,
    Client_name varchar(55) not null,
    Client_pro_type varchar(55) not null,
    Client_tel_no numeric(10) not null,
    Client_max_rent numeric(10) not null,
    Branch_number varchar(55) not null,
    Staff_number varchar(55) not null,
    Client_reg_date date not null,
    Branch_address varchar(255) not null,
    primary key(Client_number),
    foreign key(Branch_number) references Branches(Branch_number) on delete cascade,
    foreign key(Staff_number) references Staff(Staff_number)on delete cascade
);

Create table Pview
(
	Property_number varchar(55) not null,
    Client_number varchar(55) not null,
    Property_type varchar(55) not null,
    Property_view_date date not null,
    Property_address varchar(255) not null,
    Property_comment varchar(255),
    foreign key(Property_number) references Properties(Property_number) on delete cascade,
    foreign key(Client_number) references Clients(Client_number) on delete cascade
);

CREATE TABLE Lease (
    Client_number varchar(55) not null,
    Property_number varchar(55) not null,
    Client_name varchar(55) not null,
    Property_address varchar(255) not null,
    Lease_rent numeric(10) not null,
    Lease_deposit_paid varchar(10) not null,
    Lease_s_date date not null,
    Lease_e_date date not null,
    Payment_method varchar(55),
    Lease_duration int as (DATEDIFF(Lease_e_date, Lease_s_date) div 30) virtual,
    foreign key(Client_number) references Clients(Client_number) on delete cascade,
    foreign key(Property_number) references Properties(Property_number) on delete cascade
);

Create table Advertisements
(
	Advertisement_id int not null,
    Property_number varchar(55) not null,
    Advertisement_date date not null,
    primary key(Advertisement_id),
    foreign key(Property_number) references Properties(Property_number) on delete cascade
);

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
INSERT INTO Branches
VALUES ('B001', 'Glasgow' ,'123 Main St, Anytown', 'Mumbai' , 5551234);

INSERT INTO Branches
VALUES ('B002', 'Naman' , '456 High St, Somewhere','Delhi' , 5555678);

INSERT INTO Branches
VALUES ('B003','Shridhar' , '789 Park Ave, Anywhere', 'Lucknow' ,5559101);

INSERT INTO Branches
VALUES ('B004', 'Homy' ,'689 Park Antonie, Anywhere', 'Lucknow' ,5559101);

INSERT INTO Branches
VALUES ('B005', 'Riven' ,'689 P Antonie, Anywhere', 'Glasgow' ,5552101);


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

INSERT INTO Staff
VALUES ('S001', 'John Smith', 'Male', '1985-07-15', 'Sales Manager', 50000, '2010-01-01', 5000, 'Emily Brown', 'B001');

INSERT INTO Staff
VALUES ('S002', 'Jane Doe', 'Female', '1990-03-21', 'Marketing Executive', 35000, '2015-05-01', NULL, 'John Smith', 'B001');

INSERT INTO staff (Staff_number, Full_name, Sex, DOB, Staff_position, Staff_salary, Staff_hired_date, Staff_bonus_pay, Staff_supervisor_name, Branch_number)
VALUES ('S003', 'David Lee', 'Male', '1988-11-12', 'Accountant', 45000, '2012-06-01', 2000, 'Emily Brown', 'B002');

INSERT INTO staff (Staff_number, Full_name, Sex, DOB, Staff_position, Staff_salary, Staff_hired_date, Staff_bonus_pay, Staff_supervisor_name, Branch_number)
VALUES ('S004', 'Anna Kim', 'Female', '1993-02-28', 'HR Manager', 55000, '2014-03-01', 8000, 'John Smith', 'B003');

INSERT INTO staff (Staff_number, Full_name, Sex, DOB, Staff_position, Staff_salary, Staff_hired_date, Staff_bonus_pay, Staff_supervisor_name, Branch_number)
VALUES ('S005', 'Peter Chen', 'Male', '1987-09-03', 'Software Developer', 60000, '2013-07-01', 5000, 'David Lee', 'B002');

INSERT INTO staff (Staff_number, Full_name, Sex, DOB, Staff_position, Staff_salary, Staff_hired_date, Staff_bonus_pay, Staff_supervisor_name, Branch_number)
VALUES ('S007', 'Michael Johnson', 'Male', '1991-08-20', 'Customer Service Representative', 30000, '2016-02-01', NULL, 'Anna Kim', 'B003');

INSERT INTO staff (Staff_number, Full_name, Sex, DOB, Staff_position, Staff_salary, Staff_hired_date, Staff_bonus_pay, Staff_supervisor_name, Branch_number)
VALUES ('S008', 'Catherine Wong', 'Female', '1989-04-17', 'Marketing Coordinator', 40000, '2017-01-01', 3000, 'Jane Doe', 'B001');

INSERT INTO staff (Staff_number, Full_name, Sex, DOB, Staff_position, Staff_salary, Staff_hired_date, Staff_bonus_pay, Staff_supervisor_name, Branch_number)
VALUES ('S009', 'Catherine Mahajan', 'Female', '1979-04-17', 'Marketing Director', 400000, '2016-01-01', 6000, 'Jane Doe', 'B005');

INSERT INTO staff (Staff_number, Full_name, Sex, DOB, Staff_position, Staff_salary, Staff_hired_date, Staff_bonus_pay, Staff_supervisor_name, Branch_number)
VALUES ('S010', 'Catherine joe', 'Female', '1990-04-17', 'Assistant', 40000, '2018-01-01', 2000, 'Jane Doe', 'B005');

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

INSERT INTO Properties (Property_number, Property_type, Property_address, Property_rent, Property_room, Staff_number, Property_deposit , Branch_number)
VALUES ('P001', 'Apartment', '123 Main St, Anytown', 1200, 2, 'S001','1000', 'B001');

INSERT INTO Properties (Property_number, Property_type, Property_address, Property_rent, Property_room, Staff_number, Property_deposit ,Branch_number)
VALUES ('P002', 'House', '456 High St, Somewhere', 1800, 3, 'S002', '2000', 'B002');

INSERT INTO Properties (Property_number, Property_type, Property_address, Property_rent, Property_room, Staff_number, Property_deposit ,Branch_number)
VALUES ('P003', 'Condo', '789 Park Ave, Anywhere', 1500, 2, 'S003', '3000','B003');

INSERT INTO Properties (Property_number, Property_type, Property_address, Property_rent, Property_room, Staff_number, Property_deposit ,Branch_number)
VALUES ('P004', 'Cono', '789 Park Ave, Glasgow', 1500, 2, 'S004', '3000','B003');

INSERT INTO Properties (Property_number, Property_type, Property_address, Property_rent, Property_room, Staff_number, Property_deposit ,Branch_number)
VALUES ('P005', 'Flat', 'Manchester St', 15000, 5, 'S001', '13000','B003');
INSERT INTO Properties (Property_number, Property_type, Property_address, Property_rent, Property_room, Staff_number, Property_deposit ,Branch_number)
VALUES ('P006', 'Flat', 'Aberdeen St', 400, 3, 'S004', '2000','B002');
-- INSERT INTO Properties (Property_number, Property_type, Property_address, Property_rent, Property_room, Staff_number, Branch_number)
-- VALUES ('P004', 'Anturli', '779 Park Aveue, Anywhere', 1500, 2, 'S004', 'B003');

-- INSERT INTO Properties (Property_number, Property_type, Property_address, Property_rent, Property_room, Staff_number, Branch_number)
-- VALUES ('P005', 'Belaswadi', '799 DenPark Ave, Anywhere', 1000, 2, 'S005', 'B003');
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

INSERT INTO Powner
VALUES ('John Doe', 'PO001', '456 Main St, Anytown', 5551234, 'Individual', 'P001');

INSERT INTO Powner 
VALUES ('Jane Smith', 'PO002', '789 Elm St, Somewhere', 5555678, 'Company', 'P002');

INSERT INTO Powner
VALUES ('Bob Johnson', 'PO003', '123 Oak St, Anywhere', 5559012, 'Individual', 'P003');

INSERT INTO Powner
VALUES ('Bob JohnY', 'PO004', '123 Oak St, Somewhere', 5559112, 'Private', 'P004');

INSERT INTO Powner
VALUES ('Bobby joe', 'PO005', 'Manchester St, Anytown', 1234566, 'Business', 'P005');

INSERT INTO Powner
VALUES ('Ten Singh', 'PO006', 'Aberdeen St, Dubai', 1452666, 'Private', 'P006');
-- INSERT INTO Powner
-- VALUES ('Bob Clark', 'PO005', '123 Oakstand St, Anywhere', 5509012, 'Individual', 'P004');
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

INSERT INTO clients (Client_number, Client_name, Client_pro_type, Client_tel_no , Client_max_rent, Branch_number, Staff_number, Client_reg_date, Branch_address) VALUES ('C001', 'John Doe', 'Apartment', '7666276540', 1500, 'B001', 'S001', '2022-01-01', '123 Main St');
INSERT INTO clients (Client_number, Client_name, Client_pro_type, Client_tel_no , Client_max_rent, Branch_number, Staff_number, Client_reg_date, Branch_address) VALUES ('C002', 'Jane Smith', 'House', '7566276540', 2000, 'B002', 'S002', '2022-02-15', '456 Oak St');
INSERT INTO clients (Client_number, Client_name, Client_pro_type, Client_tel_no , Client_max_rent, Branch_number, Staff_number, Client_reg_date, Branch_address) VALUES ('C003', 'Bob Johnson', 'Condo', '7662276540',1200, 'B001', 'S003', '2022-03-20', '789 Pine Ave');
INSERT INTO clients (Client_number, Client_name, Client_pro_type, Client_tel_no , Client_max_rent, Branch_number, Staff_number, Client_reg_date, Branch_address) VALUES ('C004', 'Emily Davis', 'Townhouse', '7766276540',1800, 'B002', 'S004', '2022-04-10', '1011 Maple St');
INSERT INTO clients (Client_number, Client_name, Client_pro_type, Client_tel_no , Client_max_rent, Branch_number, Staff_number, Client_reg_date, Branch_address) VALUES ('C005', 'Michael Lee', 'Apartment', '7616276540',1400, 'B003', 'S005', '2022-05-05', '1213 Elm St');
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

INSERT INTO Pview (Property_number, Client_number, Property_type, Property_view_date, Property_address, Property_comment)
VALUES ('P001', 'C001', 'House', '2023-05-15', '123 Main St', 'Lovely backyard'),
('P002', 'C003', 'Apartment', '2023-04-18', '456 Elm St', 'Great natural light'),
('P003', 'C004', 'House', '2023-04-25', '789 Oak St', 'Needs some updates'),
('P003', 'C005', 'Condo', '2023-05-01', '555 Pine St', 'Spacious living room'),
('P001', 'C002', 'Apartment', '2023-04-20', '222 Maple St', 'Recently renovated');
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

INSERT INTO Lease (Client_number, Property_number, Client_name, Property_address, Lease_rent, Lease_deposit_paid, Lease_s_date, Lease_e_date, Payment_method)
VALUES
('C004', 'P001', 'John Doe', '123 Main St', 1500, 'Yes', '2022-05-01', '2023-05-01', 'Credit Card'),
('C002', 'P002', 'Jane Smith', '456 Oak St', 2000, 'No', '2022-06-01', '2024-06-01', 'Check'),
('C001', 'P003', 'Bob Johnson', '789 Elm St', 1800, 'Yes', '2022-07-01', '2023-12-01', 'Bank Transfer');
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

INSERT INTO Advertisements (Advertisement_id, Property_number, Advertisement_date)
VALUES
    (1, 'P001', '2022-03-15'),
    (2, 'P002', '2022-03-17'),
    (5, 'P002', '2022-04-17'),
    (6, 'P002', '2022-05-17'),
    (3, 'P003', '2022-03-18'),
    (15, 'P004', '2022-04-05');

-- (a) List details of staff supervised by a named Supervisor at the branch.
Select * from staff where staff_supervisor_name = "John Smith" and Branch_number = (select Branch_number from Branches where Branch_city = 'Mumbai');

-- List details of all Assistants alphabetically by name at the branch.
SELECT *
FROM Staff
WHERE Staff_position = 'Assistant' AND Branch_number = 'B005'
ORDER BY Full_name ASC;

-- List the details of property (including the rental deposit) available for rent at the branch, along with the owner’s details.
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
  p.Branch_number = 'B001' AND p.Property_rent > 0;

-- List the details of properties managed by a named member of staff at the branch.
Select Properties.* , Powner.* from Properties 
join Powner on Properties.Property_number = Powner.Property_number 
where Properties.Staff_number = "S003" and Properties.Branch_number = "B003";

-- List the clients registering at the branch and the names of the members of staff who registered the clients.
SELECT c.Client_number, c.Client_name, c.Client_reg_date, s.Full_name AS Staff_name
FROM Clients c
JOIN Staff s ON c.Staff_number = s.Staff_number
WHERE c.Branch_number = 'B001';

--  Identify properties located in Glasgow with rents no higher than £450.
SELECT Property_number, Property_type, Property_address, Property_rent
FROM Properties
WHERE Property_address LIKE '%Glasgow%' AND Property_rent <= 450;

-- Identify the name and telephone number of an owner of a given property.
SELECT Powner_name, Powner_tel_no
FROM Powner
WHERE Property_number = 'P001';

-- List the details of comments made by clients viewing a given property.
SELECT Property_comment
FROM Pview
WHERE Property_number = 'P001' AND Property_comment IS NOT NULL;

-- Display the names and phone numbers of clients who have viewed a given property but not supplied comments.
SELECT Clients.Client_name, Clients.Client_tel_no
FROM Clients
INNER JOIN Pview ON Clients.Client_number = Pview.Client_number
WHERE Pview.Property_number = 'P003' AND Pview.Property_comment IS NULL;

-- Display the details of a lease between a named client and a given property.
SELECT *
FROM Lease
WHERE Client_name = 'Bob Johnson'
  AND Property_address = '789 Elm St';

--  Identify the leases due to expire next month at the branch.

SELECT *
FROM Lease
WHERE DATE_ADD(Lease_e_date, INTERVAL 12 MONTH) >= NOW()
AND DATE_ADD(Lease_e_date, INTERVAL 12 MONTH) < DATE_ADD(NOW(), INTERVAL 12 MONTH);


-- List the details of properties that have not been rented out for more than three months.
SELECT p.*
FROM Properties p
LEFT JOIN Lease l ON p.Property_number = l.Property_number AND l.Lease_e_date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
WHERE l.Property_number IS NULL;

--  Produce a list of clients whose preferences match a particular property.
SELECT DISTINCT c.Client_number, c.Client_name, c.Client_pro_type, c.Client_max_rent
FROM Clients c
INNER JOIN Properties p ON c.Branch_number = p.Branch_number
WHERE p.Property_type = 'Apartment' AND p.Property_rent <= 2000;


-- (a) List the details of branches in a given city.
SELECT * FROM Branches WHERE Branch_city = 'Mumbai';

-- (b) Identify the total number of branches in each city.
SELECT Branch_city, COUNT(*) as Total_Branches FROM Branches GROUP BY Branch_city;

-- (c) List the name, position, and salary of staff at a given branch, ordered by staff name.
SELECT Full_name, Staff_position, Staff_salary FROM Staff WHERE Branch_number = 'B001' ORDER BY Full_name;


-- (d) Identify the total number of staff and the sum of their salaries.
SELECT COUNT(*) as Total_Staff, SUM(Staff_salary) as Total_Salary FROM Staff;

-- (e) Identify the total number of staff in each position at branches in Glasgow.
SELECT Staff_position, COUNT(*) as Total_Staff FROM Staff
INNER JOIN Branches ON Staff.Branch_number = Branches.Branch_number
WHERE Branches.Branch_city = 'Glasgow'
GROUP BY Staff_position;

-- (f) List the name of each Manager at each branch, ordered by branch address.
SELECT Branch_address, Full_name as Manager_Name FROM Staff
INNER JOIN Branches ON Staff.Branch_number = Branches.Branch_number
WHERE Staff_position like '%Manager%'
ORDER BY Branch_address;

-- (g) List the names of staff supervised by a named Supervisor.
SELECT Full_name FROM Staff
WHERE Staff_supervisor_name = 'John Smith';

-- (h) List the property number, address, type, and rent of all properties in Glasgow, ordered by rental amount.
SELECT Property_number, Property_address, Property_type, Property_rent
FROM Properties
WHERE Property_address like '%Glasgow%'
ORDER BY Property_rent;


-- (i) List the details of properties for rent managed by a named member of staff.
SELECT *
FROM Properties
WHERE Staff_number = (SELECT Staff_number FROM Staff WHERE Full_name = 'John Smith');

-- (j) Identify the total number of properties assigned to each member of staff at a given branch.
SELECT s.Staff_number, s.Full_name AS Staff_Name, COUNT(*) AS Total_properties
FROM Staff s
JOIN Properties p ON s.Staff_number = p.Staff_number
WHERE p.Branch_number = 'B003'
GROUP BY s.Staff_number;

-- (k) List the details of properties provided by business owners at a given branch.
SELECT Properties.Property_number, Properties.Property_type, Properties.Property_address, Properties.Property_rent, Powner.Powner_name, Powner.Powner_address, Powner.Powner_tel_no
FROM Properties
JOIN Powner ON Properties.Property_number = Powner.Property_number
JOIN Branches ON Properties.Branch_number = Branches.Branch_number
WHERE Branches.Branch_name = 'Naman';

-- (l) Identify the total number of properties of each type at all branches.
SELECT Property_type, COUNT(*) as Total_properties
FROM Properties
GROUP BY Property_type;

/* -- (m) Identify the details of private property owners that provide more than one property for rent.
SELECT Powner_number, Powner_name, Powner_address, Powner_tel_no, COUNT(*) as Total_properties
FROM Powner
INNER JOIN Properties ON Powner.Property_number = Properties.Property_number
WHERE Powner.Property_type = 'Private' AND Properties.Property_type = 'House'
GROUP BY Powner.Powner_number
HAVING COUNT(*) >= 1; */

-- (n) Identify flats with at least three rooms and with a monthly rent no higher than £500 in Aberdeen.
SELECT *
FROM Properties
WHERE Property_type = 'Flat' AND Property_room >= 3 AND Property_rent <= 500 AND Property_address LIKE '%Aberdeen%';

-- (o) List the number, name, and telephone number of clients and their property preferences at a given branch.
SELECT Client_number, Client_name, Client_tel_no, Client_pro_type, Client_max_rent
FROM Clients
WHERE Branch_number = 'B001';

-- (p) Identify the properties that have been advertised more than the average number of times.
SELECT Properties.Property_number, COUNT(*) AS num_advertisements
FROM Properties
JOIN Advertisements ON Properties.Property_number = Advertisements.Property_number
GROUP BY Properties.Property_number
HAVING COUNT(*) > (SELECT AVG(num_advertisements) FROM (SELECT COUNT(*) AS num_advertisements FROM Advertisements GROUP BY Property_number) AS t);


-- (q) List the details of leases due to expire next month at a given branch.
SELECT l.Client_number, l.Property_number, c.Client_name, p.Property_address, l.Lease_rent, l.Lease_deposit_paid, l.Lease_s_date, l.Lease_e_date, l.Payment_method
FROM Lease AS l
JOIN Clients AS c ON l.Client_number = c.Client_number
JOIN Properties AS p ON l.Property_number = p.Property_number
WHERE MONTH(l.Lease_e_date) = MONTH(DATE_ADD(CURRENT_DATE(), INTERVAL 1 MONTH))
  AND YEAR(l.Lease_e_date) = YEAR(CURRENT_DATE())
  AND p.Branch_number = 'B001';


-- (r) List the total number of leases with rental periods that are less than one year at branches in London.
SELECT COUNT(*) AS Total_Leases
FROM Lease AS l
JOIN Properties AS p ON l.Property_number = p.Property_number
JOIN Branches AS b ON p.Branch_number = b.Branch_number
WHERE DATEDIFF(l.Lease_e_date, l.Lease_s_date) < 365
  AND b.Branch_city = 'London';


-- (s) List the total possible daily rental for property at each branch, ordered by branch number.
SELECT p.Branch_number, SUM(p.Property_rent * 12 / 365) AS Total_Daily_Rental
FROM Properties AS p
GROUP BY p.Branch_number
ORDER BY p.Branch_number;


    SELECT * FROM staff
    where Staff_position='Assistant'
    order by Full_name;	
    
SELECT Powner_number, Powner_name, Powner_address, Powner_tel_no, COUNT(*) as Total_properties
FROM Powner
INNER JOIN Properties ON Powner.Property_number = Properties.Property_number
GROUP BY Powner.Powner_number having Total_properties >1;

SELECT Powner_number, Powner_name, Powner_address, Powner_tel_no, COUNT(*) as Total_properties
FROM Powner
INNER JOIN Properties ON Powner.Property_number = Properties.Property_number
WHERE Powner.Powner_type = '	Private' AND Properties.Property_type = 'Cono'
GROUP BY Powner.Powner_number
HAVING COUNT(*) >= 1;

SELECT Properties.Property_number, Properties.Property_type, Properties.Property_address, Properties.Property_rent, Powner.Powner_name, Powner.Powner_address, Powner.Powner_tel_no
FROM Properties
JOIN Powner ON Properties.Property_number = Powner.Property_number
JOIN Branches ON Properties.Branch_number = Branches.Branch_number
WHERE Branches.Branch_number = 'B003';

SELECT * FROM Advertisements;
Select Properties.* from  Properties, Lease  where lease_duration < 3 and Properties.Property_number = Lease.Property_number;
select lease_duration from lease;
