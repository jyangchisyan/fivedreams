function sendForm()
{
	if(typeof(DiySecondCheckPoint)=='function')
	{
		if(!DiySecondCheckPoint())
		{
			return false;
		}
	}
	var o_Table = document.getElementById(ClientID+"DIYForm");
	var valuess = new Array(o_Table.rows.length);
	var valuesss = "";
	
//				//檢查Email和密碼
//				if (Trim(document.all("TextBox1").value).length == 0){
//					alert("【Email】必填");
//					return;
//				}
//				if (Trim(document.all("TextBox2").value).length == 0){
//					alert("【密碼】必填");
//					return;
//				}
//				if (Trim(document.all("TextBox2").value) != Trim(document.all("TextBox3").value)){
//					alert("【重複輸入密碼】與【密碼】不合");
//					return;
//				}

	for (var i=0; i<o_Table.rows.length; i++){
		var temp = "";

		var table_row_value;
		if(o_Table.rows[i].cells[0].innerText)
			table_row_value = o_Table.rows[i].cells[0].innerText;
		else
			table_row_value = o_Table.rows[i].cells[0].textContent;

		switch (table_row_value){
			case "1":
				//文字方塊
				valuess[i] = EncodeValue(document.getElementById(ClientID+"type1_" + i).value);
				break;
			case "2":
				//單選選單
				valuess[i] = EncodeValue(document.getElementById(ClientID+"type2_" + i).value);
				break;
			case "3":
				//複選方塊		
				var _cells;
				if(document.getElementById(ClientID+"type3_" + i).cells){
					_cells = document.getElementById(ClientID+"type3_" + i).cells;
				}
				else if(document.getElementById(ClientID+"type3_" + i).getElementsByTagName('td'))
				{
					_cells = document.getElementById(ClientID+"type3_" + i).getElementsByTagName('td');				
				}
				for (var j=0; j<_cells.length; j++){
				    if (document.getElementById(ClientID+"type3_" + i + "_" + j)!=null && document.getElementById(ClientID+"type3_" + i + "_" + j).checked){
					    var element_value;
					    if(navigator.appVersion.indexOf("MSIE") !=-1)
						    element_value = document.getElementById(ClientID+"type3_" + i + "_" + j).nextSibling.innerText;
					    else
						    element_value = document.getElementById(ClientID+"type3_" + i + "_" + j).nextSibling.textContent;
						
					    temp += EncodeValue(element_value) + ",";
				    }
				}
				valuess[i] = temp.substring(0, temp.length-1);
				break;
			case "4":
				//日期元件
				valuess[i] = document.getElementById(ClientID+"type4_1_" + i).value + "," + document.getElementById(ClientID+"type4_2_" + i).value + "," + document.getElementById(ClientID+"type4_3_" + i).value;
				break;
			case "5":
				//地址元件
				valuess[i] = document.getElementById(ClientID+"type5_1_" + i).value + "," + document.getElementById(ClientID+"type5_2_" + i).value + "," + document.getElementById(ClientID+"type5_3_" + i).value + "," + EncodeValue(document.getElementById(ClientID+"type5_4_" + i).value);
				document.getElementById(ClientID+"type5_5_" + i).value = document.getElementById(ClientID+"type5_1_" + i).value + "," + document.getElementById(ClientID+"type5_2_" + i).value + "," + document.getElementById(ClientID+"type5_3_" + i).value + "," + document.getElementById(ClientID+"type5_4_" + i).value;
				if (o_Table.rows[i].cells[1].innerText == "*" && Trim(document.getElementById(ClientID+"type5_4_" + i).value) == 0){
					alert("【" + o_Table.rows[i].cells[2].innerText+ "】必填");
					return;	
				}
				//document.getElementById(ClientID+"type5_1_" + i).value='';
				document.getElementById(ClientID+"type5_2_" + i).value='';
				var _address_2 = document.getElementById(ClientID+"type5_2_" + i);
				while(_address_2.hasChildNodes()){
					_address_2.removeChild(_address_2.lastChild);
				}
				break;
			case "6":
				//性別元件
				valuess[i] = document.getElementById(ClientID+"type6_" + i).value;
				break;
			case "7":
				//多行文字元件
				valuess[i] = EncodeValue(document.getElementById(ClientID+"type7_" + i).value);
				break;
			case "8":
				//文字說明
				valuess[i] = "";
				break;
			case "9":
				//email 欄位
				valuess[i] = EncodeValue(document.getElementById(ClientID+"type9_" + i).value);
				break;
			case "10":
				//fileupload 欄位
				valuess[i] = EncodeValue(document.getElementById(ClientID+"type10_" + i).value);
				break;
		}
		var element_value_field;
		
		if(o_Table.rows[i].cells[1].innerText)
			element_value_field = o_Table.rows[i].cells[1].innerText;
		else
			element_value_field = o_Table.rows[i].cells[1].textContent;
		
		var element_value_alert;
		if(o_Table.rows[i].cells[2].innerText)
				element_value_alert = o_Table.rows[i].cells[2].innerText;
			else
				element_value_alert = o_Table.rows[i].cells[2].textContent;

		if (element_value_field == "*" && Trim(valuess[i]).length == 0){
			alert("【" + element_value_alert + "】必填");
			return false;
		}
		
		if(document.getElementById(ClientID+"captcha"))
		{
			if(Trim(document.getElementById(ClientID+"captcha").value).length==0)
			{
				alert("【驗證碼】必填");
				return false;				
			}
		}
		
		//email 要檢查格式
		reEmail=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		var element_value_email;
		
		if(o_Table.rows[i].cells[0].innerText)
			element_value_email = o_Table.rows[i].cells[0].innerText;
		else
			element_value_email = o_Table.rows[i].cells[0].textContent;
		if ( element_value_email == "9" && Trim(valuess[i]).length != 0){
			if(!reEmail.test( document.getElementById(ClientID+"type9_" + i).value )) {
				alert("【" + element_value_alert + "】請填寫正確Email格式");
				return false;
			}
		}
	}

	for (x in valuess){
		valuesss += valuess[x] + "|";
	}
	document.getElementById(ClientID+"h_valuess").value = valuesss.substring(0, valuesss.length-1);
	
	__doPostBack(ClientID.replace("_","$")+'LinkButton1','');
}

function EncodeValue(oldValue){
	var newValue = oldValue;
	while (newValue.indexOf("*") != -1)
		newValue = newValue.replace("*", "#a1#");
	
	while (newValue.indexOf("@") != -1)
		newValue = newValue.replace("@", "#b2#");
	
	while (newValue.indexOf("|") != -1)
		newValue = newValue.replace("|", "#c3#");
		
	while (newValue.indexOf(",") != -1)
		newValue = newValue.replace(",", "#d4#");
		
	return newValue;
}

function Trim(oldValue){
	var newValue = oldValue;
	while (newValue.length > 0 && newValue.indexOf(" ") == 0)
		newValue = newValue.substring(1);
		
	while (newValue.length > 0 && newValue.lastIndexOf(" ") == newValue.length-1)
		newValue = newValue.substring(0, newValue.length-1);

	return newValue;
}
//===================================================================================================
var xmldoc;
var xmlfile = "object450_address.xml";
var o_City;
var o_city_xml_child;
function City_onChange(obj){
	o_City = obj;
	
	if (xmldoc == null) {
		if(window.ActiveXObject){
			xmldoc = new ActiveXObject("msxml2.DOMDocument.3.0");
			xmldoc.onreadystatechange = CheckState;
			xmldoc.async="false";
			xmldoc.load(xmlfile);
		}else if (document.implementation && document.implementation.createDocument){
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET",xmlfile,true);
			xmlhttp.onreadystatechange = CheckState2;
			xmlhttp.send(null);
		}else{
			alert('error');
		}
	}
	//else
		SetTownList();		
}

function CheckState2()
{
	var state = xmlhttp.readyState;
	if (state == 4) {
		xmldoc = xmlhttp.responseXML;
		SetTownList();
	}

}

function CheckState()
{
	var state = xmldoc.readyState;
	if (state == 4) {
		var err = xmldoc.parseError;
		if (err.errorCode != 0)
			alert("Error Code : 1031.");
		else
			SetTownList();
	}
}

function SetTownList(){
	if(window.ActiveXObject){
		o_city_xml_child = xmldoc.getElementsByTagName(o_City.value).nextNode;
	}else if (document.implementation && document.implementation.createDocument){
		if(xmldoc!=null)
			o_city_xml_child = xmldoc.getElementsByTagName(o_City.value)[0];
		else
			return;
	}
	
	o_Town = o_City.nextSibling;
	//clear TownList
	for (var i=o_Town.options.length-1; i>-1; i--){
		if(window.ActiveXObject)
			o_Town.options(i).removeNode();
		else
			o_Town.remove(i);		
	}
	//set TownList
	if(o_city_xml_child)
	for (var i=0; i<o_city_xml_child.childNodes.length; i++){
		if(o_city_xml_child.childNodes[i].nodeName=="#text") continue;
		var oOption = document.createElement("OPTION");
		o_Town.options.add(oOption);			
		if(document.all)
			oOption.innerText = o_city_xml_child.childNodes[i].nodeName;
		else{				
			oOption.appendChild(document.createTextNode(o_city_xml_child.childNodes[i].nodeName));
		}
		oOption.value = o_city_xml_child.childNodes[i].nodeName;
		//o_Town.options.add(oOption); 不能寫在這 =.=||
	}
	
	//set ZCode
	if(o_Town.options.length!=0){
		o_Town.nextSibling.value = o_city_xml_child.childNodes[0].text;
	}else{
		o_Town.nextSibling.value = '';
	}
	if(!document.all){
		Town_onChange(o_Town);
	}
	
	if(o_Town.options.length==1)
	{
		for (var i=o_Town.options.length-1; i>-1; i--){
			if(window.ActiveXObject)
				o_Town.options(i).removeNode();
			else
				o_Town.remove(i);		
		}	
	}
}

function Town_onChange(obj){
	//set ZCode
	var _t = xmldoc.getElementsByTagName(obj.previousSibling.value);
	if(_t)
	{
		if(window.ActiveXObject){
			obj.nextSibling.value = _t.nextNode.getElementsByTagName(obj.value).nextNode.childNodes[0].nodeValue;
		}else if (document.implementation && document.implementation.createDocument){
			if(_t.length!=0 && _t[0].getElementsByTagName(obj.value)[0])
				obj.nextSibling.value = _t[0].getElementsByTagName(obj.value)[0].childNodes[0].nodeValue;
		}
	}	
}
//===================================================================================================
function InitAddress(){
	var o_Table = document.getElementById(ClientID+"DIYForm");
	for (var i=0; i<o_Table.rows.length; i++){
		var temp_var;
		if(document.all)
			temp_var = o_Table.rows[i].cells[0].innerText;
		else
			temp_var = o_Table.rows[i].cells[0].textContent;
		if (temp_var == "5"){
			alert("地址元件初始化");									//沒它會掛點ㄟ....真奇怪
			City_onChange(document.getElementById(ClientID+"type5_1_" + i));
		}
	}
}