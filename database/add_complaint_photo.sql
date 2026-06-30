USE helpsphere;

ALTER TABLE complaints
  ADD COLUMN photo_url LONGTEXT AFTER description;
