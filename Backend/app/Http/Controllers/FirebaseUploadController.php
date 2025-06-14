<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FirebaseService;

class FirebaseUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'imagen' => 'required|file|mimes:jpg,jpeg,png|max:2048'
        ]);

        $firebase = new FirebaseService();
        $url = $firebase->uploadImage($request->file('imagen'));

        return response()->json(['url' => $url], 200);
    }
}
