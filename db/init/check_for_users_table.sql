SELECT EXISTS (
  SELECT 1
  FROM   information_schema.tables 
  WHERE  table_schema = 'public'
  AND    table_name = 'auth_bypass_users'
);