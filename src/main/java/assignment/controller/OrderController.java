package assignment.controller;

import assignment.entity.Order;
import assignment.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @RequestMapping(path = "/getOrders", method = RequestMethod.GET)
    public Map<String, Object> getOrders(@RequestParam String page) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("data", orderService.getAllOrders(Integer.parseInt(page)));
            response.put("status", 200);
            return response;
        }catch (Exception e){
            response.put("error", "SERVER_ERROR");
            response.put("status", 500);
            return response;
        }
    }

    @RequestMapping(path = "/getOrderByUser", method = RequestMethod.GET)
    public Map<String, Object> getOrderByUser(@RequestParam String user_id, @RequestParam String page){
        Map<String, Object> response = new HashMap<>();
        try{
            response.put("data", orderService.getOrdersByUser(user_id, Integer.parseInt(page)));
            response.put("status", 200);
            return response;
        }
        catch (Exception e){
            response.put("error", "SERVER_ERROR");
            response.put("status", 500);
            return response;
        }
    }

}
