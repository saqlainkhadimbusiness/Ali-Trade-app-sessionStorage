// restricted tinkers
$(document).ready(function() {
    $(".buy").click(function() {
        var id = $(this).attr('id');
        if (id == 7 || id == 9) {
            alert("You are Restricted to buy this tinker.");

        }
    });
});

var id;

$(document).ready(function() {

    //to store a long timed purchased tinkers
    if (sessionStorage.getItem("stored") != 1) {
        var today_date1 = new Date();
        sessionStorage.setItem("stored", 1);
        sessionStorage.setItem("id", 1);
        sessionStorage.setItem("date" + "1", formatDate(new Date(today_date1.setMonth(today_date1.getMonth() - 1))));
        sessionStorage.setItem("full_date1", new Date(today_date1.setMonth(today_date1.getMonth() - 1)));
        sessionStorage.setItem("stock" + "1", "Ados Pakistan Ltd");
        sessionStorage.setItem("ticker" + "1", "ADOS");
        sessionStorage.setItem("quantity" + "1", "1");

        var today_date2 = new Date();
        sessionStorage.setItem("id", 2);
        sessionStorage.setItem("date" + "2", formatDate(new Date(today_date1.setMonth(today_date1.getMonth() - 1))));
        sessionStorage.setItem("full_date2", new Date(today_date2.setMonth(today_date2.getMonth() - 1)));
        sessionStorage.setItem("stock" + "2", "	Agha Steel Ind.Ltd.");
        sessionStorage.setItem("ticker" + "2", "AGHA");
        sessionStorage.setItem("quantity" + "2", "1");
    }
    var html_elements = " ";

    //  funciton to show purchased tinkers
    owned_trades();

    //  funciton to formate date
    function parseDate(str) {
        var mdy = str.split('-')
        return new Date(mdy[2], mdy[0] - 1, mdy[1]);
    }
    // funciton to show tinkers 
    function owned_trades() {
        html_elements = " ";
        let id_for = sessionStorage.getItem("id");
        // console.log(id_for);
        for (let index = 1; index <= id_for; index++) {
            var session = sessionStorage.getItem("ticker" + index);
            if (session != "") {
                let own_ticker = sessionStorage.getItem("ticker" + index);
                let own_stock = sessionStorage.getItem("stock" + index);
                let own_date = sessionStorage.getItem("date" + index);
                let own_quantity = sessionStorage.getItem("quantity" + index);
                var myvar = '<tr class=\'srow-' + index + '\'>' +
                    '                    <td class=\'stock\'>' + sessionStorage.getItem("stock" + index) + '</td>' +
                    '                    <td class=\'ticker\'>' + sessionStorage.getItem("ticker" + index) + '</td>' +
                    '                    <td class=\'sell_date\'>' + sessionStorage.getItem("date" + index) + '</td>' +
                    '                    <td>' + sessionStorage.getItem("quantity" + index) + '</td>' +
                    '                    <td>' +
                    '                        <button href=\'#\' class=\'btn btn-danger sell\' id=\'' + index + '\'>Sell</button>' +
                    '                    </td>' +
                    '                </tr>';
                html_elements += myvar;
            }
        }
        $('#holdings').html(html_elements);
    }

    var sell = 0;

    //  funciton to sell tinkers

    $(document).on('click', '.sell', function(e) {
        e.preventDefault();
        var sell_id = $(this).attr("id");
        if ($("srow-" + sell_id).length == 0) {
            if ($("srow-" + sell_id + " td").length == 0) {

                var sessiondate = sessionStorage.getItem("full_date" + sell_id);
                sessiondateobj = new Date(sessiondate);
                var current_date = new Date();
                var last_month = new Date(current_date.setMonth(current_date.getMonth() - 1));

                if (last_month < sessiondateobj) {
                    alert("Payment decline: date of buying is less than a month");
                } else if (last_month >= sessiondateobj) {
                    if (myFunction() == 1) {
                        sessionStorage.removeItem(sell_id);
                        sessionStorage.removeItem("date" + sell_id);
                        sessionStorage.removeItem("full_date" + sell_id);
                        sessionStorage.removeItem("stock" + sell_id);
                        sessionStorage.setItem("ticker" + sell_id, "");
                        sessionStorage.removeItem("quantity" + sell_id);
                        owned_trades();
                    }
                }

            }
        }
    });

    //  funciton to confirm to sell tinker
    function myFunction() {
        let text = "Are you sure you want to Sell this Ticker! Click OK to confirm.";
        if (confirm(text) == true) {
            return sell = 1;
        } else {
            return sell = 0;
        }

    }

    function changeprice(id) {

        $('#quantity').on('change keyup keydown keypress', function() {

            var price = $(".row-" + id).find("b").html();
            var quantity = $("#quantity").val();
            price = parseFloat(price);
            price = price * quantity;
            htmlprice = "Price : " + price.toFixed(2) + " $";
            $("#modal p").html(htmlprice);

        });

    }

    // function to change date formate dd-mm-yyyy
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [day, month, year].join('-');
    }

    // call funciton to show modal with tinkers data
    $('.buy').click(function() {

        changeprice(id);

        var id = $(this).attr("id");
        if ($("row-" + id).length == 0) {
            if ($("row-" + id + " td").length == 0) {
                var stock = $(".row-" + id).find(".stock").html();
                var ticker = $(".row-" + id).find(".ticker").html();
                $("#modal h2").html(ticker);
                $("#modal h5").html("stock: " + stock);
                changeprice(id);
                $('#purchase').click(function() {

                    if ($("#quantity").val() != '') {
                        var date = new Date();


                        var quantity = $("#quantity").val();
                        $("#quantity").val('');
                        var todaysDate = formatDate(date);
                        var newid = parseInt(sessionStorage.getItem("id")) + 1;
                        var full_date = Date();

                        sessionStorage.setItem("id", newid);
                        sessionStorage.setItem("date" + newid, todaysDate);
                        sessionStorage.setItem("full_date" + newid, full_date);
                        sessionStorage.setItem("stock" + newid, stock);
                        sessionStorage.setItem("ticker" + newid, ticker);
                        sessionStorage.setItem("quantity" + newid, quantity);
                        owned_trades();
                        console.log("sored");
                        $('#myModal').modal('hide');
                        $('#myModal').modal('hide');
                    }


                });

            }
        }



    });

});