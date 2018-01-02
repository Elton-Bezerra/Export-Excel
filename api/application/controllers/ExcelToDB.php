<?php class ExcelToDB extends CI_Controller {

	public function index()
	{
		$this->load->library('PHPExcel');		
		$uploadedFile = $_FILES['upload']['tmp_name']; // recebe o arquivo temporário

		// $inputFileName = '/var/www/projeto_excel/planilhas/teste.xls';
		$objPHPExcel = PHPExcel_IOFactory::load($uploadedFile);
		$cell_collection = $objPHPExcel->getActiveSheet()->getCellCollection();
		//extract to a PHP readable array format
		foreach ($cell_collection as $key => $cell) {
		    $column = $objPHPExcel->getActiveSheet()->getCell($cell)->getColumn();
		    $row = $objPHPExcel->getActiveSheet()->getCell($cell)->getRow();
		    $data_value = $objPHPExcel->getActiveSheet()->getCell($cell)->getValue();
		 
		    //The header will/should be in row 1 only. of course, this can be modified to suit your need.
		    if ($row == 1) {
		        $header[$row][$column] = $data_value;		        		        
		    } else {
		    	$arr_data[$row][$header[1][$column]] = $data_value;//HEADER[1][$COLUMN] = nome da coluna na tabela
		    }		    
	 	}
		
		$res = $this->db->insert_batch('usuarios', $arr_data);
		if(!$res){
			return $this->output->set_content_type('application/json')->set_status_header(400);
			exit();
		}
		if($this->db->error()['code'] <> 0){
			return $this->output->set_content_type('application/json')->set_status_header(400);
			exit();
		}
		return $this->output->set_content_type('application/json')->set_output($res);
	}	
}?>