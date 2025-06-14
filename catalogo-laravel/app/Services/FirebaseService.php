<?php

namespace App\Services;

use Kreait\Firebase\Factory;

class FirebaseService
{
    protected $storage;

    public function __construct()
    {
        $factory = (new Factory)
            ->withServiceAccount(storage_path('app/firebase/firebase_credentials.json'));

        $this->storage = $factory->createStorage();
    }

    public function uploadImage($file, $folder = 'productos')
    {
        $bucket = $this->storage->getBucket();
        $filename = $folder . '/' . uniqid() . '.' . $file->getClientOriginalExtension();

        $bucket->upload(
            file_get_contents($file->getRealPath()),
            ['name' => $filename]
        );

        return "https://firebasestorage.googleapis.com/v0/b/" .
            $bucket->name() .
            "/o/" . urlencode($filename) . "?alt=media";
    }
}
