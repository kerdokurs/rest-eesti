# Migration `20200828084206-latest`

This migration has been generated by Kerdo at 8/28/2020, 11:42:06 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."APIKey" (
"id_" SERIAL,
"id" text   NOT NULL ,
"value" text   NOT NULL ,
"valid" boolean   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id_")
)

CREATE UNIQUE INDEX "APIKey.id_unique" ON "public"."APIKey"("id")

CREATE UNIQUE INDEX "APIKey.value_unique" ON "public"."APIKey"("value")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200827115616..20200828084206-latest
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Maakond {
   id_ Int @default(autoincrement()) @id
@@ -25,4 +25,14 @@
   nimi     String
   rahvaarv Int
   Maakond  Maakond[]
 }
+
+model APIKey {
+  id_ Int @default(autoincrement()) @id
+
+  id    String  @unique
+  value String  @unique
+  valid Boolean
+
+  createdAt DateTime @default(now())
+}
```


