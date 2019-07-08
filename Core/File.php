<?php
namespace Core;

use Core\Http\Request;


class File
{
    // public static $root = dirname(__DIR__);

    public static function get(string $dir, string $file): array
    {
        $root = self::dir();
        return require "$root/$dir/$file";
    }

    /**
     * Put file to a specific directory using file object
     *
     * @param string $dir
     * @param Request $file
     * @return boolean
     */
    public static function move(string $dir, array $file)
    {   
        $dir = ROOT."/".$dir;
        // dump($dir);
        self::makeDir($dir);
        if(move_uploaded_file($file['tmp_name'], $dir.$file['name'])){
            return true;
        }
    }

    public static function readAsText(string $filename)
    {
        $filename = ROOT."/".$filename;
        // return $filename;
        $file = fopen($filename, 'r') or die('error');
        $text = fread($file, filesize($filename));
        fclose($file);
        return $text;
    }

    public static function imgToBase64(string $file)
    {
        $dir = ROOT."/".$file;
        $type = pathinfo($dir, PATHINFO_EXTENSION);
        $data = base64_encode(file_get_contents($dir));
        return "data:image/{$type};base64,{$data}";
    }

    public static function getMimeType(string $file)
    {
        $dir = ROOT."/".$file;
        return mime_content_type($dir); 
    }

    /**
     * Extract zip to a specific folder
     * 
     * @param string $dir
     * @param array $file
     * @return bool
     */
    public static function extractZip(string $dir, array $file): bool
    {
        $dir = ROOT."/".$dir;
        self::makeDir($dir);
        $zip = new \ZipArchive();
        $zip->open($file['tmp_name']);
        $check = $zip->extractTo($dir);
        $zip->close();
        return $check ? true : false;
    }

    /**
     * Creates new folder
     *
     * @param string $dir
     * @return void
     */
    public static function makeDir(string $dir): void
    {
        if(!file_exists($dir)){
            mkdir($dir, 0777, true);
        }
    }

    /**
     * Root Directory
     *
     * @return string
     */
    public static function dir(): string
    {
        return dirname(__DIR__);
    }
}
