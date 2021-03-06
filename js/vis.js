                function drawTextInCanvas(text) {
                    var canvas = document.getElementById("mirnavisname");
                    var context = canvas.getContext("2d");
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    drawCircle();
                    context.fillStyle = "black";
                    context.font = "12pt Helvetica";
                    context.fillText(text, 40, 65);
                }

                function drawCircle() {
                    var canvas = document.getElementById('mirnavisname');
                    var context = canvas.getContext('2d');
                    var centerX = canvas.width / 2;
                    var centerY = canvas.height / 2;
                    var radius = 55;

                    context.beginPath();
                    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                    context.fillStyle = "#eed975";
                    context.fill();
                    context.lineWidth = 2;
                    context.strokeStyle = '#003300';
                    context.stroke();
                }

                function serverReqValidatedTargets() {
                    jQuery_132_172_latest.ajax({
                        type: "POST",
                        url: "loadSuggestions.php",
                        data: {
                            'mirnaSelectedForDisplay': selectedMirna,
                            'idata': 95
                        },
                        success: function (validatedTargetsResultsAreBack) {
                            var onlyVt = JSON.parse(validatedTargetsResultsAreBack);
                            drawValidatedTargets(onlyVt);
                            jQuery_132_172_latest("#numberingTabs2").show();
                        }
                    });
                }

                function serverReqTopTargets() {
                    jQuery_132_172_latest.ajax({
                        type: "POST",
                        url: "loadSuggestions.php",
                        data: {
                            'mirnaSelectedForDisplay': selectedMirna,
                            'idata': 100
                        },
                        success: function (topTargetsResultsAreBack) {
                            var onlyTt = JSON.parse(topTargetsResultsAreBack);
                            drawTopTargets(onlyTt);
                            jQuery_132_172_latest("#numberingTabs3").show();
                        }
                    });
                }

                function serverReqFunctions() {
                    jQuery_132_172_latest.ajax({
                        type: "POST",
                        url: "loadSuggestions.php",
                        data: {
                            'mirnaSelectedForDisplay': selectedMirna,
                            'idata': 105
                        },
                        success: function (functionResultsAreBack) {
                            var onlyD = JSON.parse(functionResultsAreBack);
                            drawDavid(onlyD);
                            jQuery_132_172_latest("#numberingTabs4").show();
                        }
                    });
                }

                function serverReqDiseases() {
                    jQuery_132_172_latest.ajax({
                        type: "POST",
                        url: "loadSuggestions.php",
                        data: {
                            'mirnaSelectedForDisplay': selectedMirna,
                            'idata': 110
                        },
                        success: function (diseaseResultsAreBack) {
                            var onlyDisease = JSON.parse(diseaseResultsAreBack);
                            var tmp;
                            jQuery_132_172_latest.ajax({
                                type: "POST",
                                url: "loadSuggestions.php",
                                data: {
                                    'mirnaSelectedForDisplay': selectedMirna,
                                    'idata': 111
                                },
                                success: function (disease_more_url) {
                                    tmp = JSON.parse(disease_more_url);
                                    drawDisease(onlyDisease, tmp[0]['more_dis_url']);
                                    jQuery_132_172_latest("#numberingTabs5").show();
                                }
                            });
                        }
                    }); // end of Diseases Ajax req
                }

                function serverReqPathways() {
                    jQuery_132_172_latest.ajax({
                        type: "POST",
                        url: "loadSuggestions.php",
                        data: {
                            'mirnaSelectedForDisplay': selectedMirna,
                            'idata': 115
                        },
                        success: function (pathwayResultsAreBack) {
                            var onlyPathways = JSON.parse(pathwayResultsAreBack);
                            var tmp;
                            jQuery_132_172_latest.ajax({
                                type: "POST",
                                url: "loadSuggestions.php",
                                data: {
                                    'mirnaSelectedForDisplay': selectedMirna,
                                    'idata': 116
                                },
                                success: function (pathway_more_url) {
                                    tmp = JSON.parse(pathway_more_url);
                                    drawPathways(onlyPathways, tmp[0]['more_path_url']);
                                    jQuery_132_172_latest("#numberingTabs6").show();
                                }
                            });
                        }
                    }); // end of Pathways Ajax req
                }

function drawCounts(data) {
	var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', 'Species');
        dataTable.addColumn('number', 'Data count');

        for(var iter=0;iter<data.length;iter++) {
                dataTable.addRow( [ data[iter]['species']+' miRNA', parseInt(data[iter]['count'], 10) ] );
        }

        optionsPie = {  title: 'miRNA categories', fontSize: '16px',
			backgroundColor: '#EAECE7'
                        //backgroundColor: { 'fill': 'rgb(182, 184, 149)', 'strokeWidth': 1}, colors: ['#254180', '#3054a6', '#4970ca', '#6889d3', '#c7d3ee']
                };
        var vis = new google.visualization.PieChart(document.getElementById('tableIndex'));
        vis.draw(dataTable, optionsPie);
}

        function drawStats(data) {
		var dataTableStatsLine = new google.visualization.DataTable();
		dataTableStatsLine.addColumn('string', 'Type');
		dataTableStatsLine.addColumn('number', 'Count');

		dataTableStatsLine.addRow( [ 'Chemicals', parseInt(data[5], 10)] );
		dataTableStatsLine.addRow( [ 'miRNAs', parseInt(data[6], 10) ] );
                dataTableStatsLine.addRow( [ 'Regulators', parseInt(data[2], 10) ] );
                dataTableStatsLine.addRow( [ 'Validated Targets', parseInt(data[0], 10) ] );
		dataTableStatsLine.addRow( [ 'Functions', parseInt(data[1], 10) ]);
                dataTableStatsLine.addRow( [ 'Diseases', parseInt(data[3], 10) ] );
                dataTableStatsLine.addRow( [ 'Pathways', parseInt(data[4], 10) ] );
		dataTableStatsLine.addRow( [ 'Pubmed IDs', parseInt(data[7], 10) + parseInt(data[8], 10) + parseInt(data[9], 10) + parseInt(data[10], 10) ] );
		dataTableStatsLine.addRow( [ 'Species', parseInt(data[11], 10)] );

                var cssNames = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                optionsStatsLine['cssClassNames'] = cssNames;

		optionsStatsLine = { title: 'Features', backgroundColor: '#EAECE7' };
		var visStatsLine = new google.visualization.BarChart(document.getElementById('tableBar'));
		visStatsLine.draw(dataTableStatsLine, optionsStatsLine);

		google.visualization.events.addListener(visStatsLine, 'select', selectHandler);
		var counter = 1;

		function selectHandler() {
		        var selection = visStatsLine.getSelection();
		        var message = '';
		        for (var i = 0; i < selection.length; i++) {
		                var item = selection[i];
		                if (item.row != null && item.column != null) {
					message += item.row + ' @@@' + '\n';
					if(parseInt( item.row, 10) === 0 ) { // chemicals
				                jQuery_132_172_latest.ajax({
				                        type: "POST",
				                        url: "loadSuggestions.php",
				                        data: {'idata': 555},
							dataType: "json",
				                        success: function(data) {
								drawOnlyChemicals(data);
								jQuery_191_1101( "#dialog" ).dialog( "open" );
				                        }
				                });
					}
		                } else if (item.row != null) {
		                        message += '{row:' + item.row + '}' +'\n' ; //+ ',column:' + item.column + '} = ' + str + '\n';
		                } else if (item.column != null) {
					message += item.row + ' $$$' + '\n';
		                        }
		        } // for loop end
		        if (message == '') {
		                message = 'nothing';
		        }
			//alert(message);
		} // end of select event handler */

        } // end of drawStats

	function drawOnlyChemicals(data) {
		var optionsChemicals = {alternatingRowStyle: true};
		dataTableChemicals = new google.visualization.DataTable();
		dataTableChemicals.addColumn('string', 'Chemical');
		dataTableChemicals.addRows(data.length);
		for(var iter = 0; iter < data.length ;iter++) { 
			dataTableChemicals.setCell(iter, 0, data[iter]['chem_name']);
		}

                var cssNamesChemicals = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
		optionsChemicals['cssClassNames'] = cssNamesChemicals;
                optionsChemicals['page'] = 'enable';
		optionsChemicals['pageSize'] = 10; 
		optionsChemicals['pagingSymbols'] = {prev: 'prev', next: 'next'};
		optionsChemicals['pagingButtonsConfiguration'] = 'auto';

                visChemicals = new google.visualization.Table(document.getElementById('dialog')); 
		visChemicals.draw(dataTableChemicals, optionsChemicals);
		google.visualization.events.addListener(visChemicals, 'select', selectHandler);

		function selectHandler() {
		        var selection = visChemicals.getSelection();
		        var message = '';
		        for (var i = 0; i < selection.length; i++) {
		                var item = selection[i];
				if (item.row != null && item.column != null) {
					message += "111";
				} else if (item.row != null) {
					var str = dataTableChemicals.getFormattedValue(item.row, 0);
					message += dataTableChemicals.getFormattedValue(item.row, 0); //item.row; //item.row + ': ' + str;
				}
				else if (item.column != null) {
					var str = dataTableChemicals.getFormattedValue(0, item.column);
					message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
					}
			}

			//alert(message);
	                jQuery_132_172_latest.ajax({
	                        type: "POST",
	                        url: "tmpp.php", //"dbLookup.php",
	                        data: {"fromHome": message},
				dataType: "json",
				success: function(dataa, textStatus, jqXHR) {
					window.location.href = 'dbLookup.php';
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert(xhr.responseText);
					alert(thrownError);
				}
	                });
		} // end of selectHandler
	} // end of drawOnlyChemicals

function drawChemicalsmirnavis(data) {
	var chemicals = "";
	var rows = data.length;
	if(rows>0) {
		for(var iter=0; iter<rows; iter++) {
			chemicals += '<a href="'+data[iter]['ctd_link']+'" class="embeddedAnchors" target="_blank">' + data[iter]['chem_name']+'</a>'+", ";
		}
		$("#mirnachemicals").html(chemicals.slice(0, -2));
		$("#chemicalshr, .downArrowchemical, #chemicalshrinhibition, #chemicalshrinhibitionvertical").show();
	} else {
		$("#mirnachemicals").html("No chemicals to display");
		$("#chemicalshr, .downArrowchemical, #chemicalshrinhibition, #chemicalshrinhibitionvertical").hide();
	}
}

function drawUpstreammirnavis(data) {
	var genes = "",
	    affect = "";
	var rows = data.length;
	if(rows>0) {
		for(var iter=0; iter<rows; iter++) {
			if(data[iter]['up_regul'].indexOf("Up") != -1 || data[iter]['up_regul'].indexOf("vation") != -1 ) {
				genes += data[iter]['up_tf']+", ";
			}
			else if(data[iter]['up_regul'].indexOf("own") != -1 || data[iter]['up_regul'].indexOf("ssion") != -1 ) {
				affect += data[iter]['up_tf']+", ";
			} /*else {
				console.log(data[iter]['up_regul']);
			}*/
		}
		if(genes) {
			$("#mirnavisupstream").html(genes.slice(0, -2));
			$("#upstreamhr, .upstreamhrvertical").show();
		} else {
			$("#mirnavisupstream").html("No upstream activators to display");
			$("#upstreamhr, .upstreamhrvertical").hide();
		}
		if(affect) {
			$("#mirnavisupstream-repression").html(affect.slice(0, -2));
			$("#upstreamrepressorshr, .downArrowrepressor, #upstreamrepressorvalidatedhr, #upstreamrepressorshrhorizontal, .downArrowrepressorvalidated").show();
		} else {
			$("#mirnavisupstream-repression").html("No upstream repressors to display");
			$("#upstreamrepressorshr, .downArrowrepressor, #upstreamrepressorvalidatedhr, #upstreamrepressorshrhorizontal, .downArrowrepressorvalidated").hide();
		}
		//$("#upstreamhr, #upstreamhrvertical").show();
	} else {
		$("#mirnavisupstream").html("No upstream activators to display");
		$("#mirnavisupstream-repression").html("No upstream repressors to display");
		$("#upstreamhr, .upstreamhrvertical, #upstreamrepressorshr, .downArrowrepressor, #upstreamrepressorvalidatedhr, #upstreamrepressorshrhorizontal, .downArrowrepressorvalidated").hide();
	}
}


var visualizationOne, visualizationTwo, visualizationThree, visualizationFour, visualizationFive, visualizationSix;
var dataTableOne = new google.visualization.DataTable(),
    dataTableTwo = new google.visualization.DataTable();
	        // draws the table      
        function drawTab(type) {
		if(type == 1) {
	               	visualizationOne.draw(dataTableOne, options);
		}
		if(type == 2) {
			visualizationTwo.draw(dataTableTwo, options);
		}
		if(type == 3) {
			visualizationThree.draw(dataTableThree, options);
		}
                if(type == 4) {
                        visualizationFour.draw(dataTableFour, options);
                }
                if(type == 5) {
                        visualizationFive.draw(dataTableFive, options);
                }
                if(type == 6) {
                        visualizationSix.draw(dataTableSix, options);
                }
	}

        // sets number of pages
	function setNumberOfPagesDownUpstream(value) {
                if(value) {
               	        options['pageSize'] = parseInt(value, 10);
                       	options['page'] = 'enable';
	        } else {
        	        options['pageSize'] = null;
                        options['page'] = null;
                }
	        drawTab(1);
       	}

        // sets number of pages
        function setNumberOfPagesDownValidated(value) {
                if(value) {
                        options['pageSize'] = parseInt(value, 10);
                        options['page'] = 'enable';
                } else {
                        options['pageSize'] = null;
                        options['page'] = null;
                }
                drawTab(2);
        }

	function setNumberOfPagesDownTop(value) {
                if(value) {
                        options['pageSize'] = parseInt(value, 10);
                        options['page'] = 'enable';
                } else {
                        options['pageSize'] = null;
                        options['page'] = null;
                }
                drawTab(3);
	}

        function setNumberOfPagesDownFunctions(value) {
                if(value) {
                        options['pageSize'] = parseInt(value, 10);
                        options['page'] = 'enable';
                } else {
                        options['pageSize'] = null;
                        options['page'] = null;
                }
                drawTab(4);
        }

        function setNumberOfPagesDownDiseases(value) {
                if(value) {
                        options['pageSize'] = parseInt(value, 10);
                        options['page'] = 'enable';
                } else {
                        options['pageSize'] = null;
                        options['page'] = null;
                }
                drawTab(5);
        }

        function setNumberOfPagesDownPathways(value) {
                if(value) {
                        options['pageSize'] = parseInt(value, 10);
                        options['page'] = 'enable';
                } else {
                        options['pageSize'] = null;
                        options['page'] = null;
                }
                drawTab(6);
        }

	function drawUpstream(data) {
		dataTableOne = new google.visualization.DataTable();
                var numRowsOne = data.length;
                dataTableOne.addColumn('string', 'Regulators'); 
		dataTableOne.addColumn('string', 'Regulation of miR'); 
		dataTableOne.addColumn('string', 'PMID (NCBI)'); 
		dataTableOne.addRows(numRowsOne);

		for(var iter = 0; iter < numRowsOne ;iter++) { 
			dataTableOne.setCell(iter, 0, data[iter]['up_tf']);
			dataTableOne.setCell(iter, 1, data[iter]['up_regul']);
			pubmedurl = 'http://www.ncbi.nlm.nih.gov/pubmed?term='+data[iter]['up_pubId'];
			dataTableOne.setCell(iter, 2, '<a href="'+pubmedurl+'" class="embeddedAnchors" target="_blank">'+data[iter]['up_pubId']+'</a>');
		}
                var cssNamesOne = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                document.getElementById('pageCntUpstream').innerHTML = numRowsOne; //total;

                optionsOne['cssClassNames'] = cssNamesOne;
                optionsOne['page'] = 'enable'; optionsOne['pageSize'] = 10; optionsOne['pagingSymbols'] = {prev: 'prev', next: 'next'}; optionsOne['pagingButtonsConfiguration'] = 'auto';
                /*var rem = numRowsOne % 10;
                if(numRowsOne >= 10) {
                        document.getElementById('pageNumberingTabs1').innerHTML = 10;
                }
                else {
                        document.getElementById('pageNumberingTabs1').innerHTML = rem;
                }*/
                visualizationOne = new google.visualization.Table(document.getElementById('drawTabs1'));
		drawTab(1);
		//visualizationOne.draw(dataTableOne, optionsOne);
                /*google.visualization.events.addListener(visualizationOne, 'page', function (e) {
                                var counnt = numRowsOne - ( e.page*10 ) ;
                                if( counnt >= 10 ) {
                                        document.getElementById('pageNumberingTabs1').innerHTML = (e.page * 10) + 10; //e.page + 1;
                                }
                                else {
                                        document.getElementById('pageNumberingTabs1').innerHTML = (e.page * 10) + rem;
                                }
                });*/
	}

function drawValidatedTargetsmirnavis(data) {
	var gene = "",
	    genes = "",
	    entrez = "";
	var rows = data.length;
	if(rows>0) {
		for(var iter=0; iter<rows; iter++) {
			entrez = 'http://www.ncbi.nlm.nih.gov/gene?Db=gene&Cmd=ShowDetailView&TermToSearch='+data[iter]['entrez_id'];
			gene = '<a href="'+entrez+'" class="embeddedAnchors" target="_blank">'+data[iter]['gene_name']+'</a>';
			genes += gene+", ";
		}
		$("#mirnavisvalidated").html(genes.slice(0, -2));
		$("#validatedtargetshr, #validatedtargetshrvertical, #validatedtoptargetshr, .upArrowvalidatedtop").show();
	} else {
		$("#mirnavisvalidated").html("No validated targets to display");
		$("#validatedtargetshr, #validatedtargetshrvertical, #validatedtoptargetshr, .upArrowvalidatedtop").hide();
	}
}

	function drawValidatedTargets(data) {
		dataTableTwo = new google.visualization.DataTable();
		var numRowsTwo = data.length;
		dataTableTwo.addColumn('string', 'Gene Name (NCBI)'); 
		dataTableTwo.addColumn('string', 'Entrez ID (NCBI)'); 
		dataTableTwo.addColumn('string', 'PMID (NCBI)'); 
		dataTableTwo.addRows(numRowsTwo);

		for(var iterTwo = 0; iterTwo < numRowsTwo; iterTwo++) {
			var entrezurl = 'http://www.ncbi.nlm.nih.gov/gene?Db=gene&Cmd=ShowDetailView&TermToSearch='+data[iterTwo]['entrez_id'];
			dataTableTwo.setCell(iterTwo, 0, '<a href="'+entrezurl+'" class="embeddedAnchors" target="_blank">'+data[iterTwo]['gene_name']+'</a>');
			dataTableTwo.setCell(iterTwo, 1, '<a href="'+entrezurl+'" class="embeddedAnchors" target="_blank">'+data[iterTwo]['entrez_id']+'</a>');
                        mirnaurl = 'http://www.ncbi.nlm.nih.gov/pubmed?term='+ data[iterTwo]['gene_pubId'];
                        dataTableTwo.setCell(iterTwo, 2, '<a href="'+mirnaurl+'" class="embeddedAnchors" target="_blank">' + data[iterTwo]['gene_pubId'] + '</a>');
		}
                var cssNamesTwo = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                optionsTwo['cssClassNames'] = cssNamesTwo;
                optionsTwo['page'] = 'enable'; optionsTwo['pageSize'] = 10; optionsTwo['pagingSymbols'] = {prev: 'prev', next: 'next'}; optionsTwo['pagingButtonsConfiguration'] = 'auto';

                var total = Math.ceil(numRowsTwo/10);
                document.getElementById('pageCntValidTargets').innerHTML = numRowsTwo; //total;

                /*var rem = numRowsTwo % 10;
                if(numRowsTwo >= 10) {
                        document.getElementById('pageNumberingTabs2').innerHTML = 10;
                }
                else {
                        document.getElementById('pageNumberingTabs2').innerHTML = rem;
                }*/

		visualizationTwo = new google.visualization.Table(document.getElementById('drawTabs2')); 
		drawTab(2);
		//visualizationTwo.draw(dataTableTwo, optionsTwo);
		/*google.visualization.events.addListener(visualizationTwo, 'page', function(e)  {
                                var counnt = numRowsTwo - ( e.page*10 ) ;
                                if( counnt >= 10 ) {
                                        document.getElementById('pageNumberingTabs2').innerHTML = (e.page * 10) + 10; //e.page + 1;
                                }
                                else {
                                        document.getElementById('pageNumberingTabs2').innerHTML = (e.page * 10) + rem;
                                }
		});*/
	}

function drawTopTargetsmirnavis(data) {
	var gene = "",
	    genes = "",
	    entrez = "";
	var rows = data.length;
	if(rows>0) {
		for(var iter=0; iter<rows; iter++) {
			entrez = 'http://www.ncbi.nlm.nih.gov/gene?Db=gene&Cmd=ShowDetailView&TermToSearch='+data[iter]['entrez_id'];
			gene = '<a href="'+entrez+'" class="embeddedAnchors" target="_blank">'+data[iter]['gene_name']+'</a>';
			genes += gene+", ";
		}
		$("#mirnavistop").html(genes.slice(0, -2));
                $("#validatedtoptargetshr, .upArrowvalidatedtop").show();
	} else {
		$("#mirnavistop").html("No top targets to display");
		$("#validatedtoptargetshr, .upArrowvalidatedtop").hide();
	}
}

	function drawTopTargets(data) {
		dataTableThree = new google.visualization.DataTable();
		var numRowsThree = data.length;
		dataTableThree.addColumn('number', 'Gene Rank'); 
		dataTableThree.addColumn('string', 'Gene Name (NCBI)'); 
		dataTableThree.addColumn('string', 'Entrez ID (NCBI)');
		dataTableThree.addRows(numRowsThree);

		for(var iterThree = 0; iterThree < numRowsThree; iterThree++) {
			dataTableThree.setCell(iterThree, 0, parseInt(data[iterThree]['gene_rank'], 10) );
                        var entrezurl = 'http://www.ncbi.nlm.nih.gov/gene?Db=gene&Cmd=ShowDetailView&TermToSearch='+data[iterThree]['entrez_id'];
			dataTableThree.setCell(iterThree, 1, '<a href="'+entrezurl+'" class="embeddedAnchors" target="_blank">'+data[iterThree]['gene_name']+'</a>');
                        dataTableThree.setCell(iterThree, 2, '<a href="'+entrezurl+'" class="embeddedAnchors" target="_blank">'+data[iterThree]['entrez_id']+'</a>');
		}
		/*dataTableThree.setCell( numRowsThree, 0, 0 );
		dataTableThree.setCell( numRowsThree, 1, 'More');
		dataTableThree.setCell( numRowsThree, 2, '');*/

                var cssNamesThree = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                optionsThree['cssClassNames'] = cssNamesThree;
		optionsThree['page']='enable';optionsThree['pageSize']=10; optionsThree['pagingSymbols']={prev:'prev', next:'next'}; optionsThree['pagingButtonsConfiguration']='auto';
                document.getElementById('pageCntTopTargets').innerHTML = numRowsThree+1;
                /*var rem = (numRowsThree+1) % 10;
                if(numRowsThree >= 10) {
                        document.getElementById('pageNumberingTabs3').innerHTML = 10;
                }
                else {
                        document.getElementById('pageNumberingTabs3').innerHTML = rem;
                }*/

		visualizationThree = new google.visualization.Table(document.getElementById('drawTabs3')); 
		/*google.visualization.events.addListener(visualizationThree, 'page', function(e) {
	                        var counnt = (numRowsThree+1) - ( e.page*10 ) ;
                                if( counnt >= 10 ) {
                                        document.getElementById('pageNumberingTabs3').innerHTML = (e.page * 10) + 10; //e.page + 1;
                                }
                                else {
                                        document.getElementById('pageNumberingTabs3').innerHTML = (e.page * 10) + rem;
                                }
		});*/
		//visualizationThree.draw(dataTableThree, optionsThree);
		drawTab(3);
	}

function drawFunctionsmirnavis(data) {
	var functionurl = "",
	    functions = "",
	    capfunction = "";
	var rows = data.length;
	if(rows>0) {
		for(var iter=0; iter<rows; iter++) {
			capfunction = capitalizeFirstLetter(data[iter]['mir_fun']);
			functionurl = '<a href="'+data[iter]['mir_fun_link']+'" class="embeddedAnchors" target="_blank">'+capfunction+'</a>';
			functions += functionurl+", ";
		}
		$("#mirnavisfunction").html(functions.slice(0, -2));
                $("#pathwayfunctionhr").show();
                $("#pathwayfunctionhrvertical").show();
		$("#diseasehr, #functionshr, .downArrowfunction, .downArrowdisease, #functionshrinhibition, #functionshrinhibitionvertical").show();
	} else {
		$("#mirnavisfunction").html("No Functions to display");
                $("#pathwayfunctionhr").hide();
                $("#pathwayfunctionhrvertical").hide();
		$("#diseasehr, #functionshr, .downArrowfunction, .downArrowdisease, #functionshrinhibition, #functionshrinhibitionvertical").hide();
	}
}

        function drawDavid(data) {
                dataTableFour = new google.visualization.DataTable();
                var numRowsFour = data.length;
		dataTableFour.addColumn('string', 'Function of miRNA (Quick GO)');
		dataTableFour.addRows(numRowsFour);
		var davidURL = '';

		for(var iterFour = 0; iterFour < numRowsFour; iterFour++) {
	                var capitalizeDavid = capitalizeFirstLetter(data[iterFour]['mir_fun']);
			davidURL = '<a href="'+data[iterFour]['mir_fun_link']+'" class="embeddedAnchors" target="_blank">'+capitalizeDavid+'</a>';
                        dataTableFour.setCell(iterFour, 0, davidURL);
                }
                var cssNamesFour = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                optionsFour['cssClassNames'] = cssNamesFour;
		optionsFour['page']='enable'; optionsFour['pageSize']=10; optionsFour['pagingSymbols']={prev:'prev', next: 'next'}; optionsFour['pagingButtonsConfiguration']='auto';
		document.getElementById('pageCntFunctions').innerHTML = numRowsFour;

                visualizationFour = new google.visualization.Table(document.getElementById('drawTabs4'));
		drawTab(4);
        }

function drawDiseasesmirnavis(data) {
	var diseaseurl = "",
	    diseases = "",
	    capdisease = "";
	var rows = data.length;
	if(rows>0) {
		for(var iter=0; iter<rows; iter++) {
			capdisease = capitalizeFirstLetter(data[iter]['dis_name']);
			diseaseurl = '<a href="'+data[iter]['dis_link']+'" class="embeddedAnchors" target="_blank">'+capdisease+'</a>';
			diseases += diseaseurl+", ";
		}
		$("#mirnavisdiseases").html(diseases.slice(0, -2));
		$("#functiondiseasehr").show();
		$("#diseasehr, .downArrowdisease, #functiondiseasehr, .downArrowfunctiondisease").show();
	} else {
		$("#mirnavisdiseases").html("No diseases to display");
		$("#functiondiseasehr").hide();
		$("#diseasehr, .downArrowdisease, #functiondiseasehr, .downArrowfunctiondisease").hide();
	}
}

        function drawDisease(data, url) {
                dataTableFive = new google.visualization.DataTable();
                var numRowsFive = data.length; 
		var diseaseURL='';
                dataTableFive.addColumn('string', 'Disease Name (mir2disease)');
		dataTableFive.addColumn('string', 'Regulation of miRNA'); 
		dataTableFive.addColumn('string', 'PMID (NCBI)');

		dataTableFive.addRows(numRowsFive + 1);
                for(var iterFive = 0; iterFive < numRowsFive; iterFive++) {
			var capitalizeDisease = capitalizeFirstLetter(data[iterFive]['dis_name']);
			diseaseURL = '<a href="'+data[iterFive]['dis_link']+'" class="embeddedAnchors" target="_blank">'+capitalizeDisease+'</a>';
                        dataTableFive.setCell(iterFive, 0, diseaseURL);
                        dataTableFive.setCell(iterFive, 1, data[iterFive]['dis_reguln']);
                        dataTableFive.setCell(iterFive, 2, '<a href="http://www.ncbi.nlm.nih.gov/pubmed?term='+data[iterFive]['dis_pubId']+'" class="embeddedAnchors" target="_blank">'+data[iterFive]['dis_pubId']+'</a>');
                }
			dataTableFive.setCell( numRowsFive, 0, '');
			dataTableFive.setCell( numRowsFive, 1, '<a href="'+ url + '" class="embeddedAnchors" target="_blank"> More </a>');
			dataTableFive.setCell( numRowsFive, 2, '');

                var cssNamesFive = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                optionsFive['cssClassNames'] = cssNamesFive;
		optionsFive['page']='enable'; optionsFive['pageSize']=10; optionsFive['pagingSymbols']={prev:'prev', next:'next'}; optionsFive['pagingButtonsConfiguration']='auto';

		document.getElementById('pageCntDiseases').innerHTML = numRowsFive+1;
                visualizationFive = new google.visualization.Table(document.getElementById('drawTabs5'));
		drawTab(5);
        }

function drawPathwaysmirnavis(data) {
	var pathwayurl = "",
	    pathways = "",
	    cappathway = "";
	var rows = data.length;
	if(rows>0) {
		for(var iter=0; iter<rows; iter++) {
			cappathway = capitalizeFirstLetter(data[iter]['pathway']);
			pathwayurl = '<a href="'+data[iter]['path_url']+'" class="embeddedAnchors" target="_blank">'+cappathway+'</a>';
			pathways += pathwayurl+", ";
		}
		$("#mirnavispathways").html(pathways.slice(0, -2));
		$("#pathwayshr, #pathwayshrvertical, #pathwayfunctionhr, #pathwayfunctionhrvertical, #toptargetspathwayshr").show();
	} else {
		$("#mirnavispathways").html("No pathways to display");
		$("#pathwayshr, #pathwayshrvertical, #pathwayfunctionhr, #pathwayfunctionhrvertical, #toptargetspathwayshr").hide();
	}
}

        function drawPathways(data, url) {
                dataTableSix = new google.visualization.DataTable();
                var numRowsSix = data.length; var pathwayURL = '';
                dataTableSix.addColumn('string', 'Pathway (KEGG PATHWAY)');
		dataTableSix.addRows(numRowsSix + 1);
                for(var iterSix = 0; iterSix < numRowsSix; iterSix++) {
			pathwayURL = '<a href="'+data[iterSix]['path_url']+'" class="embeddedAnchors" target="_blank">'+data[iterSix]['pathway']+'</a>';
                        dataTableSix.setCell(iterSix, 0, pathwayURL);
                }
		dataTableSix.setCell(numRowsSix, 0, '<a href="'+url+ '" class="embeddedAnchors" target="_blank"> More </a>');

                var cssNamesSix = {oddTableRow: 'testOddRow', tableRow: 'tableRow', hoverTableRow: 'hoveringTableRow', selectedTableRow: 'tableRowSelected'};
                optionsSix['cssClassNames'] = cssNamesSix;
		optionsSix['page']='enable'; optionsSix['pageSize']=10; optionsSix['pagingSymbols']={prev:'prev', next:'next'}; optionsSix['pagingButtonsConfiguration'] = 'auto';

		document.getElementById('pageCntPathways').innerHTML = numRowsSix+1;
                visualizationSix = new google.visualization.Table(document.getElementById('drawTabs6'));
		drawTab(6);
        }

        // sets the number of pages according to the user selection.
        function setNumberOfPages(value) {
        if (value) {
        options['pageSize'] = parseInt(value, 10);
        options['page'] = 'enable';
        } else {
        options['pageSize'] = null;
        options['page'] = null;  
        }
        draw();
        }

        // Sets custom paging symbols "Prev"/"Next"
        function setCustomPagingButtons(toSet) {
        options['pagingSymbols'] = toSet ? {next: 'next', prev: 'prev'} : null;
        draw();  
        }

        function setPagingButtonsConfiguration(value) {
        options['pagingButtonsConfiguration'] = value;
        draw();
        }

