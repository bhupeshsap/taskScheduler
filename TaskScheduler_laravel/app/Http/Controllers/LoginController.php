<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use App\Quote;
use App\User;
use Illuminate\Http\Request;

Class LoginController extends Controller{

	public function getData()
	{
		$result = User::all();
		$response = ['data'=>$result];
		return response()->json($response,200);
	}

	public function getTasks($id)
	{
        $res = DB::table('task_list')
		          ->where('assignee',$id)
		          ->orWhere('assigner', $id)
                  ->get();
        $result = User::all();
		$response = ['allUsers'=>$result,'taskData'=>$res];
		return response()->json($response,200);
	}
    
    public function getMyTasks($id)
	{
        $res = DB::table('task_list')
		          ->where('assignee',$id)
                  ->get();
		$response = ['taskData'=>$res];
		return response()->json($response,200);
	}

	public function getTaskAssignee($id)
	{
        $res = DB::table('task_list')
                  ->join('users', 'task_list.assignee', '=', 'users.id')
		          ->orWhere('task_list.assigner', $id)
		          ->select('users.id AS userId',
		          	       'users.name AS userName',
		          	       'users.email AS userEmail',
		          	       'task_list.id',
		          	       'task_list.subject',
		          	       'task_list.body',
		          	       'task_list.status',
		          	       'task_list.assigner',
		          	       'task_list.assignee',
		          	       'task_list.priority',
		          	       'task_list.created_date',
		          	       'task_list.target_date'
		          	        )
                  ->get();
        $result = User::all();
		$response = ['allUsers'=>$result,'taskData'=>$res];
		return response()->json($response,200);
	}


	public function saveData(Request $request)
	{	

		$var  = DB::table('users')->insert([
		    ['id' => $request->input('id'),
		     'name' => $request->input('name'),
		     'email' => $request->input('email'),
		     'password' => $request->input('password')
		    ]
		]);

		return response()->json($var,200);
	}

	public function validateData(Request $request)
	{
		$res = DB::table('users')
		          ->select('id','name','email')
		          ->where('name',$request->input('name'))
		          ->where('password',$request->input('password'))
                  ->get();

        if(count($res)<1)
        {
        	$result = 0;
        }
        else
        {
        	$result = 1;
        }

        $response = array('data'=>$res,
        	              'result' => $result);

		return response()->json($response,200);
	}

	public function changeData(Request $request)
	{

        $res = DB::table('users')
                  ->where('id',$request->input('id'))
                  ->update(['name' => $request->input('name'),
                            'email' => $request->input('email'), 
                            'password' => $request->input('password'), 
                  	       ]);    

		return response()->json($res,200);
	}

	public function getTask($id)
	{
        $res = DB::table('task_list')
                  ->join('users', function($join)
			        {
			          $join->on('task_list.assignee', '=', 'users.id');
			        })
                  ->select('users.id AS userId',
		          	       'users.name AS userName',
		          	       'users.email AS userEmail',
		          	       'task_list.id',
		          	       'task_list.subject',
		          	       'task_list.body',
		          	       'task_list.status',
		          	       'task_list.assigner',
		          	       'task_list.assignee',
		          	       'task_list.priority',
		          	       'task_list.created_date',
		          	       'task_list.target_date'
		          	       )
                  ->where('task_list.id',$id)
                  ->get();
        return response()->json($res,200);
         
                  

	}

	public function updateTask($id, Request $request)
	{

        $res = DB::table('task_list')
                  ->where('id',$id)
                  ->update(['status' => $request->input('status'),
                            'assignee' => $request->input('assignee'), 
                            'subject' => $request->input('subject'),
                            'target_date'=> $request->input('dateTime'),
                            'priority' => $request->input('priority'), 
                            'body' => $request->input('body'), 
                            'updated_date' => date('Y-m-d H:i:s')
                  	       ]);    

		return response()->json($res,200);
	}
  

	public function updateStatus( Request $request)
	{
        $res = DB::table('task_list')
                  ->where('id',$request->input('taskId'))
                  ->update(['status' => $request->input('status'),
                  	       ]);    
        return response()->json($res,200);
	}

	public function deleteTask($id)
	{
        $res = DB::table('task_list')->where('id',$id)->delete();

        return response()->json($res,200);
	}

	public function addTask(Request $request)
	{
        $res = DB::table('task_list')
               ->insert(
               ['status' => $request->input('status'),
                'priority' => $request->input('priority'),
                'subject' => $request->input('subject'),
                'target_date' => $request->input('dateTime'),
                'assignee' => $request->input('assignee'),
                'assigner' => $request->input('assigner'),
                'body' => $request->input('body')
               ]
             );
	    return response()->json($res,200);
	}
}